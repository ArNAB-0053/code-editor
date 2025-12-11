using PythonEditor.Models;
using System.Threading.Tasks;

namespace PythonEditor.Services.interfaces
{
    public interface IPythonRunner
    {
        Task<RunResult> RunPythonAsync(string code);
    }
}
