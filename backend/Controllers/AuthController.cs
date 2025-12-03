using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.helper;
using backend.Models;
using backend.Services.implementations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthServices _service;
        private readonly IConfiguration _config;

        public AuthController(AuthServices service, IConfiguration config)
        {
            _service = service;
            _config = config;
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

        [HttpGet("{id}")]
        public AuthModel GetUserById(string id) => _service.GetUserById(id);

        [HttpPost("signin")]
        public IActionResult SignIn([FromBody] SignInRequest req)
        {
            var user = _service.SignIn(req.Identifier, req.Password);

            if (user == null) return Unauthorized(new { message = "Invalid username/email or password", status = "error" });

            var token = JwtHelper.GenerateToken(user, _config);

            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true,
#if DEBUG
                Secure = false,
                SameSite = SameSiteMode.Lax,
#else
                    Secure = true,
                    SameSite = SameSiteMode.None,
#endif
                Expires = DateTime.UtcNow.AddDays(3)
            });

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
        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var userId1 = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
            var userId2 = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var email1 = User.FindFirst(JwtRegisteredClaimNames.Email)?.Value;
            var email2 = User.FindFirst(ClaimTypes.Email)?.Value;

            var userName = User.FindFirst("name")?.Value;
            var userId = userId1 ?? userId2;
            var userEmail = email1 ?? email2;

            return Ok(new { userId, email = userEmail, name = userName });
        }

    }
}
