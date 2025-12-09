using Microsoft.AspNetCore.Mvc;
using PythonEditor.Models;
using PythonEditor.Services.interfaces;

namespace PythonEditor.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PythonRunner: ControllerBase
    {
        private readonly IPythonRunner _pythonRunner;

        public PythonRunner(IPythonRunner pythonRunner)
        {
            _pythonRunner = pythonRunner;
        }

        [HttpPost]
        public async Task<IActionResult> Run([FromBody] RunRequest request)
        {
            var res = await _pythonRunner.RunPythonAsync(request.code);
            return Ok(res);
        }
    }
}
