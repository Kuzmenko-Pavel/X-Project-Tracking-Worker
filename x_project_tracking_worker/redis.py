import aioredis


async def init_redis(app):
    conf = app['config']['redis']
    app.redis_pool = await aioredis.create_redis_pool(
        conf['uri'],
        minsize=1, maxsize=5)


async def close_redis(app):
    app.redis_pool.close()
    await app.redis_pool.wait_closed()


async def stored(redis, data):
    time = 60 * 60 * 24
    account_id = data.get('account_id')
    ids = data.get('ids', [])
    if account_id and ids:
        pipe = redis.pipeline()
        for item in ids:
            try:
                key = '%s::%s' % (str(account_id).strip(), str(item).strip())
                pipe.incr(key)
                pipe.expire(key, time)
            except Exception as e:
                print(e)
        await pipe.execute()
