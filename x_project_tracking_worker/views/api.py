from aiohttp import web
import re
import aiohttp_jinja2
from x_project_tracking_worker.logger import logger, exception_message


@aiohttp_jinja2.template('block.html')
class ApiView(web.View):
    async def get_data(self):
        host = '127.0.0.1'
        ip_regex = re.compile(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$')
        method = self.request.method
        headers = self.request.headers

        x_real_ip = headers.get('X-Real-IP', headers.get('X-Forwarded-For', ''))
        x_real_ip_check = ip_regex.match(x_real_ip)
        if x_real_ip_check:
            x_real_ip = x_real_ip_check.group()
        else:
            x_real_ip = None

        if x_real_ip is not None:
            host = x_real_ip
        else:
            try:
                peername = self.request.transport.get_extra_info('peername')
                if peername is not None and isinstance(peername, tuple):
                    host, _ = peername
            except Exception as ex:
                logger.error(exception_message(exc=str(ex), request=str(self.request._message)))

        data = {
            'ip': host
        }
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


#
# std::string Core::Process(Params *prms)
# {
#     std::string html;
#     params = prms;
#
#     request_processed_++;
#     std::string anal ="\
#             (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\
#             (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\
#             m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\
#             })(window,document,'script','//www.google-analytics.com/analytics.js','ga');\
#             if (offer_type == 'retargeting')\
#             {\
#                 ga('create', 'UA-69836571-1', {'alwaysSendReferrer': true});\
#                 ga('send', 'pageview', {\
#                   'referrer': referrer,\
#                   'hostname': hostname,\
#                   'page': page,\
#                   'title': title\
#               });\
#             }\
#             ga('create', 'UA-69836571-2', {'alwaysSendReferrer': true, 'name': 'all'});\
#             ga('all.send', 'pageview', {\
#               'referrer': referrer,\
#               'hostname': hostname,\
#               'page': page,\
#               'title': title\
#             });";
#
#     if ( params->account_id_ == "AEE4E3DD-957C-4E6B-A111-8B43318B78D3")
#     {
#         anal ="";
#     }
#
#     html = boost::str(boost::format(config->template_out_)
#                        % params->offer_id_
#                        % params->getSecondTimeCookie()
#                        % params->account_id_
#                        % params->referrer_
#                        % params->location_
#                        % params->title_
#                        % params->gender_
#                        % params->cost_
#                        % anal
#                         );
#     return html;
# }