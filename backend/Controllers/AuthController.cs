using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.DTO;
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

        // -------------------------------
        //           CONSTRUCTOR
        // -------------------------------
        public AuthController(AuthServices service, IConfiguration config)
        {
            _service = service;
            _config = config;
        }

        // -------------------------------
        //             CRUD
        // -------------------------------

        // SIGN UP
        [HttpPost("register")]
        public async Task<IActionResult> Create([FromBody] RegisterRequest req)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = new AuthModel
                {
                    Name = req.Name,
                    Email = req.Email,
                    Username = req.Username,
                    Password = req.Password,
                    Provider = ProviderEnum.NORMAL
                };
                var createdUser = await _service.Create(user);

                return Ok(new
                {
                    message = "User registered successfully",
                    status = "success",
                    user = new
                    {
                        id = createdUser.Id,
                        name = createdUser.Name,
                        email = createdUser.Email,
                        username = createdUser.Username,
                    }
                });
            }
            catch (Exception ex) {
                return Conflict(new
                {
                    message = ex.Message,
                    status = "error"
                });
            }
        }

        [HttpPost("register/provider")]
        public async Task<IActionResult> FindOrCreateOAuthUser([FromBody] ProviderRequest req)
        {
            var provider = ProviderEnum.GITHUB; // FOR NOW IT IS HARD CODED
            try
            {
                var createdUser = await _service.FindOrCreateOAuthUser(req.Email, provider, req.ProviderId, req.Name, req.Username);

                var token = JwtHelper.GenerateToken(createdUser, _config);

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
                    message = "User registered successfully",
                    status = "success",
                    user = new
                    {
                        id = createdUser.Id,
                        name = createdUser.Name,
                        email = createdUser.Email,
                        username = createdUser.Username,
                    }
                });
            }
            catch (Exception ex)
            {
                return Conflict(new
                {
                    message = ex.Message,
                    status = "error"
                });
            }
        }

        // SIGN IN
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
                    email = user?.Email,
                    username = user?.Username
                }
            }
            );
        }

        // GET - ALL USERS
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = _service.GetAllUsers();
            return Ok(allUsers);
        }

        // GET - USERS BASED ON ID (UserId)
        [HttpGet("{id}")]
        public AuthModel GetUserById(string id) => _service.GetUserById(id);

        [HttpGet("profile-details")]
        public AuthModel GetUserByUsername([FromQuery] string username) => _service.GetUserByUsername(username);

        // GET - USER DETAILS
        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var userId1 = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
            var userId2 = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var email1 = User.FindFirst(JwtRegisteredClaimNames.Email)?.Value;
            var email2 = User.FindFirst(ClaimTypes.Email)?.Value;

            var name = User.FindFirst("name")?.Value;
            var firstName = User.FindFirst("firstname")?.Value;
            var middleName = User.FindFirst("middlename")?.Value;
            var lastName = User.FindFirst("lastname")?.Value;

            var username = User.FindFirst("username")?.Value;
            var userId = userId1 ?? userId2;
            var email = email1 ?? email2;

            return Ok(
                new
                {
                    userId,
                    email,
                    name,
                    username,
                    nameObj = new
                    {
                        firstName,
                        middleName,
                        lastName
                    }
                });
        }

        // -------------------------------
        //             SEARCH
        // -------------------------------

        // GET - SEARCH (Based on USERNAME)
        [HttpGet("search")]
        public async Task<IActionResult> SearchByUsernameAsync([FromQuery] string username)
        {
            var res = await _service.SearchByUsernameAsync(username);
            return Ok(res);
        }

        // -------------------------------
        //        VALIDATION CHECK
        // -------------------------------

        // CHECK username
        [HttpGet("check-username")]
        public async Task<IActionResult> CheckUsername([FromQuery] string username)
        {
            if (string.IsNullOrWhiteSpace(username))
                return BadRequest(new { error = true, available = false, message = "Username required" });

            if (!_service.IsValidUsername(username))
                return BadRequest(new { error = true, available = false, message = "Invalid Username Format" });

            try
            {
                await _service.CheckUsernameExists(username);
                return Ok(new { error = false, available = true, message = "Username Available" });
            }
            catch (Exception ex) {
                return Ok(new { error = false, available = false, message = ex.Message });
            }
        }

        // CHECK email
        [HttpGet("check-email")]
        public async Task<IActionResult> CheckEmail([FromQuery] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return BadRequest(new { error = true, available = false, message = "Email required" });

            if (!_service.IsValidEmail(email)) 
                return BadRequest(new { error = true, available = false, message = "Invalid Email Format" });

            try
            {
                await _service.CheckEmailExists(email);
                return Ok(new { error = false, available = true, message = "Email Available" });
            }

            catch (Exception ex) {
                return Ok(new { error = false,  available = false, message = ex.Message });
            }
        }       
    }
}
