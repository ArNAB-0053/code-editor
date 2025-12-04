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

        //GET Code
        [HttpPost]
        public CodeSaveModel GetCode([FromBody] GetCodeRequest req)
        {
            return _service.GetCode(req.UserId, req.Lang);
        }

        // CREATE or SAVE into the DB (First Time)
        [HttpPost("create")]
        public CodeSaveModel Create(CodeSaveModel savecode) => _service.Create(savecode);

        // UPDATE(Full) 
        [HttpPut("update/{id}")]
        public IActionResult Update(string id, CodeSaveModel code)
        {
            _service.Update(id, code);
            return Ok(new { message = "Saved" });
        }

        // UPDATE (Only the Output) - For CodeRunner
        [HttpPatch("update-output/{id}")]
        public IActionResult UpdateOutput(string id, [FromBody] UpdateOutputRequest req)
        {
            _service.UpdateOutput(id, req.Output);
            return Ok(new { message = "Output Updated", status="success" });
        }

        // AUTO SAVE - When code is not inside DB it will CREATE else it will UPDATE
        [HttpPost("auto-save")]
        public IActionResult AutoSave([FromBody] SaveCodeRequest req)
        {
            var result = _service.AutoSave(req.UserId, req.Lang, req.Code);
            return Ok(result);
        }

        // SHARE - Simple based on Editor ID
        [HttpPost("share/{editorId}")]
        public IActionResult GetSharedCode(string editorId)
        {
            var res = _service.SharedCode(editorId);
            return Ok(new { message = "Shared", code = res.Code, output = res.Output, lang = res.Lang });
        }
    }
}
