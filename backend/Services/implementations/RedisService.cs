using StackExchange.Redis;

namespace backend.Services.implementations
{
    public class RedisService
    {
        private readonly ConnectionMultiplexer _redis;
        public IDatabase Db { get; }

        public RedisService(IConfiguration config)
        {
            var conn = config.GetSection("Redis:ConnectionString").Value;
            _redis = ConnectionMultiplexer.Connect(conn, options =>
            {
                options.AbortOnConnectFail = false;
            });
            Db = _redis.GetDatabase();
        }

        public async Task SetString(string key, string value, int? expirySeconds = null)
        {
            TimeSpan? expiry = expirySeconds.HasValue
                ? TimeSpan.FromSeconds(expirySeconds.Value)
                : null;

            await Db.StringSetAsync(key, value, expiry, When.Always);
        }

        public async Task<string?> GetString(string key)
        {
            return await Db.StringGetAsync(key);
        }

        public async Task<long> Increment(string key)
        {
            return await Db.StringIncrementAsync(key);
        }

        public async Task<bool> Exists(string key)
        {
            return await Db.KeyExistsAsync(key);
        }
    }
}
