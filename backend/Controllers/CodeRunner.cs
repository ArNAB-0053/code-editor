using Microsoft.AspNetCore.Mvc;
using PythonEditor.Models;
using PythonEditor.Services.interfaces;

namespace CodeEditor.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CodeRunner: ControllerBase
    {
        private readonly ICodeRunner _runner;

        public CodeRunner(ICodeRunner pythonRunner)
        {
            _runner = pythonRunner;
        }

        [HttpPost]
        public async Task<IActionResult> Run([FromBody] RunRequest request)
        {
            var result = await _runner.RunCode(request.code, request.lang);
            return Ok(result);
        }

    }
}
