__all__ = ['DataProcessor']

import ujson
import re
from x_project_tracking_worker.logger import logger, exception_message

time_regex = re.compile(r'^\d{1,3}$')


class Params(dict):
    """
    Example:
    m = Map({'first_name': 'Eduardo'}, last_name='Pool', age=24, sports=['Soccer'])
    """
    def __init__(self, *args, **kwargs):
        super(Params, self).__init__(*args, **kwargs)
        for arg in args:
            if isinstance(arg, dict):
                for k, v in arg.iteritems():
                    self[k] = v

        if kwargs:
            for k, v in kwargs.iteritems():
                self[k] = v

    def __getattr__(self, attr):
        return self.get(attr)

    def __setattr__(self, key, value):
        self.__setitem__(key, value)

    def __setitem__(self, key, value):
        super(Params, self).__setitem__(key, value)
        self.__dict__.update({key: value})

    def __delattr__(self, item):
        self.__delitem__(item)

    def __delitem__(self, key):
        super(Params, self).__delitem__(key)
        del self.__dict__[key]


class DataProcessor(object):
    __slots__ = ['data', 'params', 'request']

    def __init__(self, request):
        self.params = Params()
        self.request = request
        self.data = dict({
            'fb': {},
            'yt': {}
        })

    async def get_params(self):
        query = self.request.query
        post = await self.request.post()
        self.params.account_id = post.get('id', query.get('id', ''))
        self.params.action = post.get('action', query.get('action', ''))
        self.params.gender = post.get('gender', query.get('gender', ''))
        self.params.price = post.get('price', query.get('price', ''))
        self.params.currency = post.get('currency', query.get('currency', ''))
        self.params.time = post.get('time', query.get('time', '356'))
        time_check = time_regex.match(self.params.time)
        if time_check:
            self.params.time = int(time_check.group()) * 24 * 60 * 60
        else:
            self.params.time = 356 * 24 * 60 * 60
        self.params.ip = self.request.ip

    async def fb(self):
        pass

    async def yt(self):
        add = []
        remove = []
        print(self.params.action)
        print(self.params.gender)
        print(self.params.price)
        self.data['yt'] = ujson.dumps({
                'account_id': self.params.account_id,
                'gender': self.params.gender,
                'price': self.params.price,
                'time': self.params.time,
                'add': add,
                'remove': remove
        })

    async def __call__(self):
        await self.get_params()
        await self.fb()
        await self.yt()
        return self.data
