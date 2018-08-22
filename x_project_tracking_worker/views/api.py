from aiohttp import web
import re
import aiohttp_jinja2
from datetime import datetime
from x_project_tracking_worker.logger import logger, exception_message


@aiohttp_jinja2.template('block.html')
class ApiView(web.View):
    async def get_data(self):
        # doc = {}
        ip = '127.0.0.1'
        ip_regex = re.compile(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$')
        time_regex = re.compile(r'^\d{1,3}$')
        headers = self.request.headers
        query = self.request.query
        post = await self.request.post()
        account_id = post.get('ac', query.get('ac', ''))
        title = post.get('title', query.get('title', ''))
        url = post.get('url', query.get('url', ''))
        referrer = post.get('referrer', query.get('referrer', ''))
        context = post.get('context', query.get('context', ''))
        gender = post.get('gender', query.get('gender', 'n'))
        cost = post.get('cost', query.get('cost', 0))
        time = post.get('time', query.get('time', '356'))
        offer_id = post.get('offer_id', query.get('offer_id', ''))

        time_check = time_regex.match(time)
        if time_check:
            time = int(time_check.group()) * 24 * 60 * 60
        else:
            time = 356 * 24 * 60 * 60

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
                peername = self.request.transport.get_extra_info('peername')
                if peername is not None and isinstance(peername, tuple):
                    ip, _ = peername
            except Exception as ex:
                logger.error(exception_message(exc=str(ex), request=str(self.request._message)))

        dt = datetime.now()

        data = {
            'ip': ip,
            'account_id': account_id,
            'gender': gender,
            'cost': cost,
            'time': time,
            'offer_id': offer_id,
            'title': title,
            'url': url,
            'referrer': referrer,
            'context': context
        }
        offer_exists = False
        try:
            for ids in offer_id.split(','):
                tmp = ids.split('~')
                if len(tmp) > 3:
                    if tmp[1]:
                        offer_exists = True
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), request=str(offer_id)))
        # doc['dt'] = dt
        # doc['account_id'] = account_id
        # doc['ip'] = ip
        # doc['offer_exists'] = offer_exists
        # await self.request.app.db.retargeting.insert_one(doc)
        return data

    async def get(self):
        return await self.get_data()

    async def post(self):
        return await self.get_data()

    async def put(self):
        return await self.get_data()

    async def head(self):
        return await self.get_data()

    async def delete(self):
        return await self.get_data()

    async def patch(self):
        return await self.get_data()

    async def options(self):
        return await self.get_data()
