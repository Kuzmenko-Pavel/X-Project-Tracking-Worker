__all__ = ['DataProcessor']

import re

time_regex = re.compile(r'^\d{1,3}$')


FB_ACTION = ['AddPaymentInfo', 'AddToCart', 'AddToWishlist', 'CompleteRegistration', 'Contact', 'CustomizeProduct',
             'Donate', 'FindLocation', 'InitiateCheckout', 'Lead', 'PageView', 'Purchase', 'Schedule', 'Search',
             'StartTrial', 'SubmitApplication', 'Subscribe', 'ViewContent']

GOAL_ACTION = ['CompleteRegistration', 'Donate', 'Lead', 'Purchase', 'Schedule', 'StartTrial', 'SubmitApplication',
               'Subscribe']

REMARKETING_ADD_ACTION = ['ViewContent', 'AddPaymentInfo', 'AddToCart', 'AddToWishlist', 'InitiateCheckout',
                          'Search']
REMARKETING_DELETE_ACTION = ['Purchase']
REMARKETING_ACCOUNT_ACTION = ['PageView']


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
            'yt': {},
            'goal': {}
        })

    async def get_params(self):
        query = self.request.query
        post = await self.request.post()
        self.params.account_id = post.get('id', query.get('id', ''))
        self.params.pixel_id = self.request.app.fb_pixel[self.params.account_id]
        self.params.action = post.get('action', query.get('action', ''))
        self.params.gender = post.get('gender', query.get('gender', ''))
        self.params.price = post.get('price', query.get('price', 0))
        self.params.currency = post.get('currency', query.get('currency', 'UAH'))
        self.params.time = post.get('time', query.get('time', '356'))
        self.params.cid = post.get('cid', query.get('cid', ''))
        self.params.location = post.get('dl', query.get('dl', ''))
        self.params.referrer = post.get('rl', query.get('rl', ''))
        self.params.it = post.get('it', query.get('it', ''))
        self.params.content_name = post.get('content_name', query.get('content_name', ''))
        self.params.content_type = post.get('content_type', query.get('content_type', ''))
        self.params.content_category = post.get('content_category', query.get('content_category', ''))
        self.params.value = post.get('value', query.get('value', self.params.price))
        self.params.auto_goals = post.get('auto_goals', query.get('auto_goals', 'true')) == 'true'
        self.params.console_open = post.get('cd', query.get('cd', 'true')) == 'true'
        self.params.content_ids = []
        content_ids = post.get('content_ids', query.get('content_ids', ''))
        if content_ids:
            self.params.content_ids = content_ids.split(',')
        time_check = time_regex.match(self.params.time)
        if time_check:
            self.params.time = int(time_check.group()) * 24 * 60 * 60
        else:
            self.params.time = 356 * 24 * 60 * 60
        self.params.ip = self.request.ip

    async def fb(self):
        if self.params.action in FB_ACTION:
            self.data['fb'] = {
                'id': self.params.pixel_id,
                'ev': self.params.action,
                'it': self.params.it,
                'ts': self.params.it,
                'v': '2.8.25',
                'r': 'stable',
                'if': 'false',
                'rl': self.params.referrer,
                'dl': self.params.location,
                'cd[url]': self.params.location,
                'cd[referrer]': self.params.referrer,
                'cd[account]': self.params.account_id,
                'ec': 1,
                'o': 60,
                'noscript': 1,
                'cd[content_type]': self.params.content_type,
                'cd[content_name]': self.params.content_name,
                'cd[content_category]': self.params.content_category,
                'cd[value]': self.params.value,
                'cd[currency]': self.params.currency,
            }
            if self.params.gender == 'm':
                self.data['fb']['ud[ge]'] = '62c66a7a5dd70c3146618063c344e531e6d4b59e379808443ce962b3abd63c5a'
            elif self.params.gender == 'w':
                self.data['fb']['ud[ge]'] = '252f10c83610ebca1a059c0bae8255eba2f95be4d1d7bcfa89d7248a82d9f111'
            if self.params.content_ids:
                self.data['fb']['cd[content_ids]'] = '[%s]' % ','.join(['"%s...%s"' % (str(x), str(self.params.account_id)) for x in self.params.content_ids])

    async def goal(self):
        if self.params.cid and self.params.action in GOAL_ACTION:
            self.data['goal'] ={
                'currency': self.params.currency,
                'price': self.params.price,
                'cid': self.params.cid
            }

    async def yt(self):
        add = []
        remove = []
        if self.params.action in REMARKETING_ADD_ACTION and self.params.content_ids:
            add = self.params.content_ids
        if self.params.action in REMARKETING_DELETE_ACTION and self.params.content_ids:
            remove = self.params.content_ids
        if self.params.action in REMARKETING_ACCOUNT_ACTION:
            add.append('_')

        self.data['yt'] = {
                'account_id': self.params.account_id,
                'gender': self.params.gender,
                'price': self.params.price,
                'time': self.params.time,
                'add': add,
                'remove': remove
        }

    async def __call__(self):
        await self.get_params()
        # print(self.params)
        await self.fb()
        await self.goal()
        await self.yt()
        return self.data
