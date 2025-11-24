using PythonEditor.Models;
using System.Threading.Tasks;

namespace PythonEditor.Services.interfaces
{
    public interface ICodeRunner
    {
        Task<RunResult> RunAsync(DockerRequest request);
        Task<RunResult> RunCode(string code, string lang);
    }
}
