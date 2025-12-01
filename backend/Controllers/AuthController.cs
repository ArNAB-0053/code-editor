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
        public IActionResult Create([FromBody] AuthModel auth)
        {
            var createdUser = _service.create(auth);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            if (createdUser == null)
            {
                return Conflict(new
                {
                    message = "Email already in use",
                    status = "error"
                });
            }

            return Ok(new
            {
                message = "User registered successfully",
                status = "success",
                user = new
                {
                    id = createdUser.Id,
                    name = createdUser.Name,
                    email = createdUser.Email
                }
            });
        }

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

            if (user == null) return Unauthorized( new { message = "Invalid username/email or password", status = "error" });

            return Ok(new
                {
                    message = "Logged In Successfully",
                    status = "success",
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
