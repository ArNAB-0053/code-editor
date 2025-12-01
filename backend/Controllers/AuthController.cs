using backend.Models;
using backend.Services.implementations;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route ("/api/auth")]
    [ApiController]
    public class AuthController: ControllerBase
    {
        private readonly AuthServices _service;

        public AuthController(AuthServices service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public AuthModel Create(AuthModel auth) => _service.create(auth);

        [HttpGet]  
        public IActionResult GetAllUsers()
        {
            var allUsers = _service.GetAllUsers();
            return Ok(allUsers);
        }

        [HttpPost("signin")]
        public IActionResult SignIn([FromBody] SignInRequest req)
        {
            var user = _service.SignIn(req.Identifier, req.Password);

            if (user == null) Unauthorized( new { message = "Invalid username/email or password" });

            return Ok(new
                {
                    message = "Logged In Successfully",
                    user = new
                    {
                        id = user?.Id,
                        name = user?.Name,
                        email = user?.Email
                    }
                }
            );
        }

        
    }
}
