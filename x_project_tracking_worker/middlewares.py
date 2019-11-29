from aiohttp import hdrs, web
import time
from datetime import datetime, timedelta
import re

from x_project_tracking_worker.logger import logger, exception_message


block_ip = [
    '193.34.169',
    '194.0.131',
    '77.120.109.205',
    '62.149.14.82',
    '195.26.85.200'
]


async def handle_404(request, response):
    return web.Response(text='')


async def handle_405(request, response):
    return web.Response(text='')


async def handle_500(request, response):
    return web.Response(text='')


def error_pages(overrides):
    async def middleware(app, handler):
        async def middleware_handler(request):
            try:
                response = await handler(request)
                override = overrides.get(response.status)
                if override is None:
                    return response
                else:
                    return await override(request, response)
            except web.HTTPException as ex:
                if ex.status != 404:
                    logger.error(exception_message(exc=str(ex), request=str(request._message)))
                override = overrides.get(ex.status)
                if override is None:
                    raise
                else:
                    return await override(request, ex)

        return middleware_handler

    return middleware


async def cookie_middleware(app, handler):
    async def middleware(request):
        user_cookie_name = 'yottos_unique_id'
        expires = datetime.utcnow() + timedelta(days=365)
        user_cookie_expires = expires.strftime("%a, %d %b %Y %H:%M:%S GMT")
        user_cookie_domain = '.yottos.com'
        user_cookie_max_age = 60*60*24*365
        request.user_cookie = request.cookies.get(user_cookie_name, str(time.time()).replace('.', ''))
        response = await handler(request)
        response.set_cookie(user_cookie_name, request.user_cookie,
                            expires=user_cookie_expires,
                            domain=user_cookie_domain,
                            max_age=user_cookie_max_age)
        return response

    return middleware


async def partner_lock_middleware(app, handler):
    async def middleware(request):
        ip = '127.0.0.1'
        ip_regex = re.compile(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$')
        headers = request.headers
        x_real_ip = headers.get('X-Real-IP', headers.get('X-Forwarded-For', ''))
        x_real_ip_check = ip_regex.match(x_real_ip)
        if x_real_ip_check:
            x_real_ip = x_real_ip_check.group()
        else:
            x_real_ip = None

        if x_real_ip is not None:
            ip = x_real_ip
        else:
            try:
                peername = request.transport.get_extra_info('peername')
                if peername is not None and isinstance(peername, tuple):
                    ip, _ = peername
            except Exception as ex:
                logger.error(exception_message(exc=str(ex), request=str(request._message)))

        user_cookie_name = 'yottos_ptl'
        expires = datetime.utcnow() + timedelta(days=365)
        user_cookie_expires = expires.strftime("%a, %d %b %Y %H:%M:%S GMT")
        user_cookie_domain = '.yottos.com'
        user_cookie_max_age = 60*60*24*365
        cookie = request.cookies.get(user_cookie_name)
        if cookie:
            request.partner_lock = True
        else:
            request.partner_lock = False

        if any([x in ip for x in block_ip]):
            request.partner_lock = True

        referer = headers.get('Referer', '')
        if len(referer) < 30:
            request.partner_lock = True

        response = await handler(request)
        response.set_cookie(user_cookie_name, 1,
                            expires=user_cookie_expires,
                            domain=user_cookie_domain,
                            max_age=user_cookie_max_age)
        return response

    return middleware


async def disable_cache_middleware(app, handler):
    async def middleware(request):
        expiry_time = datetime.utcnow()
        response = await handler(request)
        response.headers["Cache-Control"] = "no-cache, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = expiry_time.strftime("%a, %d %b %Y %H:%M:%S GMT")
        return response

    return middleware


def setup_middlewares(app):
    error_middleware = error_pages({404: handle_404,
                                    405: handle_405,
                                    500: handle_500})
    app.middlewares.append(error_middleware)
    app.middlewares.append(cookie_middleware)
    app.middlewares.append(disable_cache_middleware)
    app.middlewares.append(partner_lock_middleware)
