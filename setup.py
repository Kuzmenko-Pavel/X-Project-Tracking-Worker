import os
import re

from setuptools import setup, find_packages


def read_version():
    regexp = re.compile(r"^__version__\W*=\W*'([\d.abrc]+)'")
    init_py = os.path.join(os.path.dirname(__file__),
                           'x_project_tracking_worker', '__init__.py')
    with open(init_py) as f:
        for line in f:
            match = regexp.match(line)
            if match is not None:
                return match.group(1)
        else:
            msg = 'Cannot find version in x_project_tracking_worker/__init__.py'
            raise RuntimeError(msg)


install_requires = ['aiohttp',
                    'aiodns',
                    'motor',
                    'ujson',
                    'trafaret-config',
                    'pytz',
                    'aiohttp_jinja2',
                    'uvloop',
                    'cchardet',
                    'aiohttp_debugtoolbar',
                    'aioredis',
                    'aiojobs==0.2.1',
                    'aio-pika'
                    ]

setup(
    name="x_project_tracking_worker",
    version=read_version(),
    url="",
    packages=find_packages(),
    package_data={

    },
    install_requires=install_requires,
    zip_safe=False,
    entry_points={
        'console_scripts': [
        ],
    }
)
