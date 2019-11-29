import aiohttp_jinja2
import jinja2
from x_project_tracking_worker.templates.jinja2htmlcompress import HTMLCompress


def init_templates(app):
    aiohttp_jinja2.setup(
        app, loader=jinja2.PackageLoader('x_project_tracking_worker', 'templates'),
        trim_blocks=True,
        lstrip_blocks=True,
        extensions=[HTMLCompress]
    )
