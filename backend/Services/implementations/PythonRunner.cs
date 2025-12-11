using System.Runtime;
using Docker.DotNet;
using Docker.DotNet.Models;
using Microsoft.Extensions.Options;
using PythonEditor.Models;
using PythonEditor.Services.interfaces;

namespace PythonEditor.Services.implementations
{
    public class PythonRunner : IPythonRunner
    {
        private readonly DockerClient _docker;
        private readonly DockerSettings _dockerSettings;

        // Constructor
        public PythonRunner(IOptions<DockerSettings> settings)
        {
            _dockerSettings = settings.Value;

            // connecting with docker - same for all
            _docker = new DockerClientConfiguration(
                new Uri("unix:///var/run/docker.sock")
            ).CreateClient();

        }

        // Main Rub function for getting the output
        public async Task<RunResult> RunPythonAsync(string code)
        {
            // 1 - Creates a pyexec folder or directory
            string tempDir = "/temp/pyexec";
            Directory.CreateDirectory(tempDir);

            // 2 - Creates a file named main.py as in the appSettigns I named it that
            string filePath = $"{tempDir}/{_dockerSettings.FileName}";
            await File.WriteAllTextAsync(filePath, code);

            // Host Name will change based on the path
            // For me this works
            string hostTempDir = "/mnt/c/Users/arnab/OneDrive/Desktop/_PROJECT_/PythonEditor-electron-v/PythonEditor/temp/pyexec";

            // 3 - It creates the docker container
            var container = await _docker.Containers.CreateContainerAsync(
                new CreateContainerParameters
                {
                    // 3.1 - Creates the Image
                    Image = _dockerSettings.PythonImage,

                    // 3.2 - Runs the python code inside the container
                    Cmd = new[] { "python", $"{_dockerSettings.WorkDir}/{_dockerSettings.FileName}" },

                    // 3.3 - The HostConfig
                    HostConfig = new HostConfig
                    {
                        Binds = new List<string>
                        {
                            $"{hostTempDir}:{_dockerSettings.WorkDir}"
                        },
                        Memory = _dockerSettings.MemoryLimitMB * 1024 * 1024,
                        CPUQuota = _dockerSettings.CPUQuota,
                        CPUPeriod = _dockerSettings.CPUPeriod,
                        NetworkMode = _dockerSettings.NetworkMode
                    },
                    Tty = false
                }
            );

            // 4 - Start the container
            await _docker.Containers.StartContainerAsync(container.ID, null);

            // 5 - Attach a container stream
            var attachTask = _docker.Containers.AttachContainerAsync(
                container.ID,
                false,
                new ContainerAttachParameters
                {
                    Stream = true,
                    Stdout = true,
                    Stderr = true
                }
            );
            var stream = await attachTask;

            // 6 - Getting the Output
            var (stdout, stderr) = await stream.ReadOutputToEndAsync(default);
            await _docker.Containers.WaitContainerAsync(container.ID);
            string output = stdout + stderr;


            // 7 - A cleanup code to clean the container
            await _docker.Containers.RemoveContainerAsync(
                container.ID,
                new ContainerRemoveParameters
                {
                    Force = true
                }
            );

            // Deletes the main.py - sometimes can make an issue that deleting before getting the result, if it happens then just need to remove it. 
            // Keeping it as it will delete the main.py otherwise that file will be there and only modify everytime.
            try { File.Delete(filePath); } catch { }

            // 8 - Return the result
            return new RunResult
            {
                success = true,
                output = output
            };
        }
    }
}
