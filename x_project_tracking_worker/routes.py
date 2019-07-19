from .views import ApiView, ApiView2, ApiViewImage


def setup_routes(app):
    app.router.add_route('GET', '/track.fcgi', ApiView)
    app.router.add_route('POST', '/track.fcgi', ApiView)
    app.router.add_route('GET', '/pixel/track', ApiView2)
    app.router.add_route('POST', '/pixel/track', ApiView2)
    app.router.add_route('GET', '/pixel/track.png', ApiViewImage)
    app.router.add_route('POST', '/pixel/track.png', ApiViewImage)
    app.router.add_static('/pixel/static/', app['config']['dir_path'] + '/static/', append_version=True)