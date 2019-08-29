import aio_pika
from aio_pika.pool import Pool


async def init_rabbitmq(app):
    conf = app['config']['amqp']

    async def get_connection(url):
        return await aio_pika.connect_robust(url)

    connection_pool = Pool(get_connection, conf['broker_url'], max_size=2, loop=app._loop)

    async def get_channel() -> aio_pika.Channel:
        async with connection_pool.acquire() as connection:
            return await connection.channel()

    app.amqp = Pool(get_channel, max_size=10, loop=app._loop)
    app.amqp_routing_key = conf['routing_key']
    app.amqp_exchange = conf['exchange']


async def amqp_publish(app, data):
    async with app.amqp.acquire() as channel:
        exchange = await channel.declare_exchange(app.amqp_exchange, aio_pika.ExchangeType.TOPIC, durable=True,
                                                  auto_delete=False, passive=False)
        print(exchange)
        await exchange.publish(
            aio_pika.Message(data.encode()), app.amqp_routing_key,
        )
        print(app.amqp_exchange, data, app.amqp_routing_key)


