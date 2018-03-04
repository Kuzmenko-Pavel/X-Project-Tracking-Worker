import asyncio
from datetime import datetime

from motor import motor_asyncio as ma

from x_project_tracking_worker.logger import logger, exception_message


class DbWrapper():
    __slots__ = ['conf', 'client', 'db', 'retargeting_name']

    def __init__(self, conf):
        self.conf = conf
        self.client = ma.AsyncIOMotorClient(conf['uri'])
        self.db = self.client[conf['db']]
        self.retargeting_name = self.conf['collection']['retargeting']

    @property
    def retargeting(self):
        return self.db[self.retargeting_name]

    async def create_collection(self, collection_name):
        avg_obj_size = 200
        max_obj = 2000000
        try:
            await self.db.drop_collection(collection_name)
            await self.db.create_collection(collection_name, size=max_obj * avg_obj_size, capped=True, max=max_obj)
        except Exception as ex:
            logger.warning(exception_message(exc=str(ex)))
            return collection_name, False
        finally:
            return collection_name, True

    async def get_options(self, collection_name):
        options = await self.db[collection_name].options()
        return collection_name, options

    async def check_collection(self):
        tasks = []
        tasks_options = []
        retargeting_collection_name = self.retargeting_name
        tasks_options.append(self.get_options(retargeting_collection_name))

        result_options = await asyncio.gather(*tasks_options)
        for collection_name, options in result_options:
            if not options.get('capped', False):
                tasks.append(self.create_collection(collection_name))
        await asyncio.gather(*tasks)


async def init_db(app):
    conf = app['config']['mongo']
    app.db = DbWrapper(conf)
    await app.db.check_collection()
