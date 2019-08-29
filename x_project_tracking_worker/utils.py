import trafaret as T

primitive_ip_regexp = r'^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$'

TRAFARET_CONF = T.Dict({
    T.Key('mongo'):
        T.Dict({
            'uri': T.String(),
            'db': T.String(),
            T.Key('collection'):
                T.Dict({
                    'retargeting': T.String()
                })
        }),
    T.Key('redis'):
        T.Dict({
            'uri': T.String(),
        }),
    T.Key('host'): T.Regexp(primitive_ip_regexp),
    T.Key('port'): T.Int(),
    T.Key('debug'): T.Dict({
        T.Key('status', default=False): T.Bool(),
        T.Key('console', default=False): T.Bool(),
    }),
    T.Key('fb_pixel'): T.Dict({
        T.Key('default'): T.String(),
        T.Key('relation'): T.Dict().allow_extra('*')
    }),
    T.Key('amqp'): T.Dict({
        T.Key('broker_url'): T.String(),
        T.Key('queue'): T.String(),
        T.Key('exchange'): T.String(),
        T.Key('exchange_type'): T.String(),
        T.Key('routing_key'): T.String(),
        T.Key('durable'): T.Bool(),
        T.Key('auto_delete'): T.Bool(),
    }),
})