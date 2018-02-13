import trafaret as T

primitive_ip_regexp = r'^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$'

TRAFARET_CONF = T.Dict({
    T.Key('mongo'):
        T.Dict({
            'uri': T.String(),
            T.Key('collection'):
                T.Dict({
                    'retargeting': T.String()
                })
        }),
    T.Key('host'): T.Regexp(primitive_ip_regexp),
    T.Key('port'): T.Int()
})