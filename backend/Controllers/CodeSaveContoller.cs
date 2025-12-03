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

        [HttpPost("create")]
        public CodeSaveModel Create(CodeSaveModel savecode) => _service.Create(savecode);

        [HttpPut("update/{id}")]
        public IActionResult Update(string id, CodeSaveModel code)
        {
            _service.Update(id, code);
            return Ok(new { message = "Saved" });
        }

        [HttpPatch("update-output/{id}")]
        public IActionResult UpdateOutput(string id, [FromBody] UpdateOutputRequest req)
        {
            _service.UpdateOutput(id, req.Output);
            return Ok(new { message = "Output Updated", status="success" });
        }

        [HttpPost("auto-save")]
        public IActionResult AutoSave([FromBody] SaveCodeRequest req)
        {
            var result = _service.AutoSave(req.UserId, req.Lang, req.Code);
            return Ok(result);
        }
    }
}
