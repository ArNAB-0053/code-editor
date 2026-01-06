using System.Threading.Tasks;
using backend.DTO;
using backend.Models;
using backend.Services.implementations;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/files")]
    [ApiController]
    public class FilesController:ControllerBase
    {
        private readonly FilesServices _service;

        public FilesController(FilesServices services)
        {
            _service = services;
        }

        // -------------------------------
        //             CRUD
        // -------------------------------

        // (POST) - CREATE / ADD file
        [HttpPost]
        public async Task<IActionResult> CreateFile([FromBody] CreateFileRequest files)
        {
            try
            {
                var fileModel = new FilesModel
                {
                    FileName = files.FileName,
                    FileType = files.FileType,
                    Lang = files.Lang,
                    ParentId = files.ParentId,
                    OwnerId = files.OwnerId,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                var res = await _service.Create(fileModel);
                return Ok(new { status = "success", data = res });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }

        // (GET) - GET all files - based on OwnerId
        [HttpPost("list")]
        public IActionResult GetAllFiles([FromBody] FileListRequest req)
        {
            try
            {
                var res = _service.GetAllFiles(req.OwnerId, req.IsDeleted ?? false, req.ParentId);
                if (res == null) return NotFound(new { status = "error", message = "File not found" });                
                return Ok(new { status = "success", data = res });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }

        // (GET) - GET file by Id (fileId + ownerId)
        [HttpPost("details")]
        public IActionResult GetById([FromBody] FileDetailsRequest req)
        {
            try
            {
                var res = _service.GetById(req.FileId, req.OwnerId);
                if(res == null) return NotFound(new { status = "error", message = "File not found" });
                return Ok(new { status = "success", data = res });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }

        // (GET) - GET fileCode by fileId 
        [HttpPost("details/code")]
        public IActionResult GetFileCodeByFileId([FromBody] FileDetailsRequest req)
        {
            try
            {
                var res = _service.GetFilesCode(req.FileId, req.OwnerId);
                if (res == null) return NotFound(new { status = "error", message = "File not found" });
                return Ok(new { status = "success", data = res });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }

        // (PATCH) - Rename
        [HttpPatch("rename")]
        public IActionResult Rename([FromBody] UpdateRenameRequest req)
        {
            try
            {
                _service.Rename(req.FileId, req.OwnerId, req.FileName);
                return Ok(new { status = "success" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }

        // (PATCH) - Update Code
        [HttpPatch("update/code")]
        public IActionResult UpdateCode([FromBody] UpdateCodeRequest req)
        {
            try
            {
                var res = _service.UpdateCode(req.FileId, req.OwnerId, req.Code);
                if (res == null) return NotFound(new { status = "error", message = "File not found" });
                return Ok(new { status = "success", data = res });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }

        // (PATCH) - Update Output
        [HttpPatch("update/output")]
        public IActionResult UpdateOutput([FromBody] UpdateOuputRequest req)
        {
            try
            {
                var res = _service.UpdateOutput(req.FileId, req.OwnerId, req.Output);
                return Ok(new { status = "success" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }

        // PATCH - Soft Delete - Trash(Recycle Bin)
        [HttpPatch("trash")]
        public async Task<IActionResult> SoftDelete([FromBody] SoftDeleteRequest req)
        {
            try
            {
                var res = await _service.SoftDelete(req.FileId, req.OwnerId);
                return Ok(new { status = "success"});
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }

        // PATCH - Restore from Trash(Recycle Bin)
        [HttpPatch("restore")]
        public async Task<IActionResult> Restore([FromBody] SoftDeleteRequest req)
        {
            try
            {
                var res = await _service.Restore(req.FileId, req.OwnerId); 
                return Ok(new { status = "success" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }

        [HttpGet("get-breadcrumbs")]
        public async Task<IActionResult> GetBreadcrumbs([FromQuery] string folderId)
        {
            try
            {
                var res = await _service.GetBreadcrumbs(folderId);
                return Ok(new { status = "success", data = res });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }
    }
}
