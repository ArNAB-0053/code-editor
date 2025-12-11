using backend.DTO;
using backend.Models;
using backend.Services.implementations;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/share")]
    [ApiController]
    public class ShareControllers: ControllerBase
    {
        private readonly ShareServices _service;

        public ShareControllers(ShareServices service)
        {
            _service = service;
        }

        // POST - Creating Snapshot in DB
        [HttpPost]
        public IActionResult CreateShareSnapshot([FromBody] CreateShareRequest req)
        {
            try
            {
                var res = _service.CreateShare(req);
                return Ok(new { status = "success", data = res });
            } catch (Exception ex)
            {
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }

        [HttpPost("s/data")]
        public IActionResult GetShareSnapShot([FromBody] GetShareRequest req)
        {
            try
            {
                var res = _service.GetShare(shareId: req.ShareId, userId: req.CurrentUserId);
                return Ok(new { status = "success", data = res });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }

    }
}
