using backend.Models;
using backend.Services.implementations;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route ("/api/code")]
    [ApiController]
    public class CodeSaveContoller: ControllerBase
    {
        private readonly CodeSaveService _service;

        public CodeSaveContoller(CodeSaveService service)
        {
            _service = service;
        }

        [HttpPost]
        public CodeSaveModel GetCode([FromBody] GetCodeRequest req)
        {
            return _service.GetCode(req.UserId, req.Lang);
        }

        [HttpPost("save")]
        public CodeSaveModel Create(CodeSaveModel savecode) => _service.Create(savecode);

        [HttpPut("update/{id}")]
        public IActionResult Update(string id, CodeSaveModel code)
        {
            _service.Update(id, code);
            return Ok(new { message = "Saved" });
        }
    }
}
