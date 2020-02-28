import base64
import asyncio
import time
from aiohttp import web
from aiojobs.aiohttp import spawn
import ujson
import re
import aiohttp_jinja2
from urllib.parse import parse_qs
from x_project_tracking_worker.logger import logger, exception_message
from x_project_tracking_worker.redis import stored
from x_project_tracking_worker.rabbitmq import amqp_publish
from x_project_tracking_worker.data_processor import DataProcessor


PIXEL_PNG_DATA = base64.b64decode(
    b"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=")


@aiohttp_jinja2.template('block.html')
class ApiView(web.View):
    async def get_data(self):
        time_regex = re.compile(r'^\d{1,3}$')
        query = self.request.query
        post = await self.request.post()
        account_id = post.get('ac', query.get('ac', ''))
        pixel_id = self.request.app.fb_pixel[account_id]
        title = post.get('title', query.get('title', ''))
        url = post.get('url', query.get('url', ''))
        referrer = post.get('referrer', query.get('referrer', ''))
        context = post.get('context', query.get('context', ''))
        gender = post.get('gender', query.get('gender', 'n'))
        cost = post.get('cost', query.get('cost', 0))
        currency = post.get('currency', query.get('currency', ''))
        time = post.get('time', query.get('time', '356'))
        offer_id = post.get('offer_id', query.get('offer_id', ''))

        time_check = time_regex.match(time)
        if time_check:
            time = int(time_check.group()) * 24 * 60 * 60
        else:
            time = 356 * 24 * 60 * 60

        data = {
            'ip': self.request.ip,
            'account_id': account_id,
            'pixel_id': pixel_id,
            'gender': gender,
            'cost': cost,
            'time': time,
            'offer_id': offer_id,
            'title': title,
            'url': url,
            'referrer': referrer,
            'context': context,
            'partner_lock': self.request.partner_lock
        }
        if account_id and offer_id:
            remove = []
            for ids in offer_id.split(','):
                if len(ids) > 3:
                    tmp = ids.split('~')
                    if len(tmp) > 2:
                        action = tmp[0]
                        id_offer = tmp[1]
                        if action == 'remove':
                            remove.append(id_offer)
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


@aiohttp_jinja2.template('block2.html')
class ApiView2(web.View):
    async def get_data(self):
        data = dict({
            'fb': {},
            'yt': {},
            'goal': {}
        })
        try:
            data_processor = DataProcessor(self.request)
            data = await data_processor()
            if data['goal']:
                msg = ujson.dumps(data['goal'])
                await spawn(self.request, amqp_publish(self.request.app, msg, 'goal.auto'))
        except asyncio.CancelledError:
            logger.error('CancelledError DataProcessor')
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), request=str(self.request.message), data=data))
        return data

    async def get(self):
        return await self.get_data()

    async def post(self):
        return await self.get_data()

    async def put(self):
        return {}

    async def head(self):
        return {}

    async def delete(self):
        return {}

    async def patch(self):
        return {}

    async def options(self):
        return {}


class ApiViewImage(web.View):
    async def get_data(self):
        query = self.request.query
        post = await self.request.post()
        action = post.get('action', query.get('action', ''))
        value = post.get('value', query.get('value', ''))
        price = post.get('price', query.get('price', value))
        currency = post.get('currency', query.get('currency', 'UAH'))
        cid = post.get('cid', query.get('cid', ''))
        if (action == 'goal' or action == 'Goals') and cid != '':
            msg = ujson.dumps({
                'currency': currency,
                'price': price,
                'cid': cid
            })
            await spawn(self.request, amqp_publish(self.request.app, msg, 'goal.manual'))
        return web.Response(body=PIXEL_PNG_DATA, content_type='image/png')

    async def get(self):
        return await self.get_data()

    async def post(self):
        return await self.get_data()

    async def put(self):
        return {}

    async def head(self):
        return {}

    async def delete(self):
        return {}

    async def patch(self):
        return {}

    async def options(self):
        return {}


class ApiViewBeacon(web.View):
    async def get_data(self):
        print(parse_qs(await self.request.text()))
        return web.Response(body='')

    async def get(self):
        return await self.get_data()

    async def post(self):
        return await self.get_data()

    async def put(self):
        return {}

    async def head(self):
        return {}

    async def delete(self):
        return {}

    async def patch(self):
        return {}

    async def options(self):
        return {}
