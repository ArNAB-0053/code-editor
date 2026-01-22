using System.Threading.Tasks;
using backend.DTO;
using backend.Models;
using backend.Services.implementations;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/notes")]
    [ApiController]
    public class NotesCollection: ControllerBase
    {
        private readonly NotesService _service;

        public NotesCollection(NotesService service)
        {
            _service = service;
        }


        // Create / Update Note
        [HttpPut]
        public async Task<IActionResult> UpsertAsync(NotesModal note)
        {
            try
            {
                var res = await _service.UpsertAsync(note);
                return Ok(new { status = "success", data = res });
            }
            catch (Exception ex) {
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }
        
        // Get note but CodeId - (Details)
        [HttpPost("details")]
        public IActionResult GetNote(GetNotesDTO req)
        {
            try
            {
                var res = _service.GetNote(req.CodeId);
                return Ok(new { status = "success", data = res });
            }
            catch (Exception ex)
            {
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }

        // Rename Note
        [HttpPatch("rename")]
        public IActionResult RenameNote([FromBody] RenameReqDTO req)
        {
            try
            {
                _service.RenameNote(req.CodeId, req.Title);
                return Ok(new { status = "success" });
            }
            catch (Exception ex) 
            {
                return BadRequest(new { status = "error", message = ex.Message });
            }
        }
    }
}
