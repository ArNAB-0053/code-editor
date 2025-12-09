using backend.Services.implementations;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/redis")]
    [ApiController]
    public class TestRedis: ControllerBase
    {
        private readonly RedisService _redis;

        public TestRedis(RedisService redis)
        {
            _redis = redis;
        }

        [HttpGet("test")]
        public async Task<IActionResult> Test()
        {
            await _redis.SetString("hello", "world");
            var value = await _redis.GetString("hello");

            return Ok(value);
        }

    }
}
