from collections import defaultdict


async def init_fb(app):
    conf = app['config']['fb_pixel']
    app.fb_pixel = defaultdict(lambda: conf['default'])
    for key, value in conf['relation'].items():
        app.fb_pixel[key] = value
