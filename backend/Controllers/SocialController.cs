using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.DTO;
using backend.Models;
using backend.Services.implementations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/social")]
    [ApiController]
    public class SocialController: ControllerBase
    {
        private readonly SocialService _service;
        private readonly IConfiguration _config;

        // -------------------------------
        //           CONSTRUCTOR
        // -------------------------------
        public SocialController(SocialService service, IConfiguration config)
        {
            _service = service;
            _config = config;
        }

        // POST - Save / Create / Connect to Github
        [HttpPost]
        public IActionResult CreateFile([FromBody] SocialModal socials)
        {
            try
            {
                var res = _service.Create(socials);
                return Ok(new { status = "success", data = res });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }

        // GET - Github Access Token
        [Authorize]
        [HttpGet]
        public IActionResult GetAccessToken()
        {
            try
            {
                var userId1 = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
                var userId2 = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var userId = userId1 ?? userId2;

                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var res = _service.GetOwnerAndAccessToken(userId);
                return Ok(new { status = "success", data = res });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("is-connected")]
        public IActionResult IsUserConnectedToGitHub()
        {
            try
            {
                var userId1 = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
                var userId2 = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var userId = userId1 ?? userId2;

                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var res = _service.IsUserConnectedToGitHub(userId);

                return Ok(new { status = "success", data = res });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }
    }
}
