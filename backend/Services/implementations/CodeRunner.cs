using System.Runtime;
using Docker.DotNet;
using Docker.DotNet.Models;
using Microsoft.Extensions.Options;
using PythonEditor.Models;
using PythonEditor.Services.interfaces;

namespace PythonEditor.Services.implementations
{
    public class CodeRunner : ICodeRunner
    {
        private readonly DockerClient _docker;
        private readonly DockerSettings _dockerSettings;

        // Constructor
        public CodeRunner(IOptions<DockerSettings> settings)
        {
            _dockerSettings = settings.Value;

            // connecting with docker - same for all
            _docker = new DockerClientConfiguration(
                new Uri("unix:///var/run/docker.sock")
            ).CreateClient();
        }

        // Main Run function for getting the output
        //public async Task<RunResult> RunPythonAsync(string code)
        //{
        //    // 1 - Creates a pyexec folder or directory
        //    string tempDir = "/temp/pyexec";
        //    Directory.CreateDirectory(tempDir);

        //    // 2 - Creates a file named main.py as in the appSettigns I named it that
        //    string filePath = $"{tempDir}/{_dockerSettings.FileName}";
        //    await File.WriteAllTextAsync(filePath, code);

        //    // Host Name will change based on the path
        //    // For me this works
        //    string hostTempDir = "/mnt/d/.net/PythonEditor/PythonEditor/temp/pyexec";

        //    // 3 - It creates the docker container
        //    var container = await _docker.Containers.CreateContainerAsync(
        //        new CreateContainerParameters
        //        {
        //            // 3.1 - Creates the Image
        //            Image = _dockerSettings.PythonImage,

        //            // 3.2 - Runs the python code inside the container
        //            Cmd = new[] { "python", $"{_dockerSettings.WorkDir}/{_dockerSettings.FileName}" },

        //            // 3.3 - The HostConfig
        //            HostConfig = new HostConfig
        //            {
        //                Binds = new List<string>
        //                {
        //                    $"{hostTempDir}:{_dockerSettings.WorkDir}"
        //                },
        //                Memory = _dockerSettings.MemoryLimitMB * 1024 * 1024,
        //                CPUQuota = _dockerSettings.CPUQuota,
        //                CPUPeriod = _dockerSettings.CPUPeriod,
        //                NetworkMode = _dockerSettings.NetworkMode
        //            },
        //            Tty = false
        //        }
        //    );

        //    // 4 - Start the container
        //    await _docker.Containers.StartContainerAsync(container.ID, null);

        //    // 5 - Attach a container stream
        //    var attachTask = _docker.Containers.AttachContainerAsync(
        //        container.ID,
        //        false,
        //        new ContainerAttachParameters
        //        {
        //            Stream = true,
        //            Stdout = true,
        //            Stderr = true 
        //        }
        //    );
        //    var stream = await attachTask;

        //    // 6 - Getting the Output
        //    var (stdout, stderr) = await stream.ReadOutputToEndAsync(default);
        //    await _docker.Containers.WaitContainerAsync(container.ID);
        //    string output = stdout + stderr;


        //    // 7 - A cleanup  code to clean the container
        //    await _docker.Containers.RemoveContainerAsync(
        //        container.ID,
        //        new ContainerRemoveParameters
        //        {
        //            Force = true
        //        }
        //    );

        //    // OPTIONAL:
        //    // Deletes the main.py - sometimes can make an issue that deleting before getting the result, if it happens then just need to remove it. 
        //    // Keeping it as it will delete the main.py otherwise that file will be there and modify everytime.
        //    try { File.Delete(filePath); } catch { }

        //    // 8 - Return the result
        //    return new RunResult
        //    {
        //        success = true,
        //        output = output
        //    };
        //}

        public async Task<RunResult> RunAsync(DockerRequest request)
        {
            string tempDir = request.tempPath;
            Directory.CreateDirectory(tempDir);

            string filePath = $"{tempDir}/{request.filePath}";
            await File.WriteAllTextAsync(filePath, request.code);

            string hostTempDir = request.hostTempPath;

            var container = await _docker.Containers.CreateContainerAsync(
                new CreateContainerParameters
                {
                    Image = request.image,

                    Cmd = request.Cmd,

                    HostConfig = new HostConfig
                    {
                        Binds = new List<string>
                        {
                            $"{hostTempDir}:{request.workPath}"
                        },
                        Memory = _dockerSettings.MemoryLimitMB * 1024 * 1024,
                        CPUQuota = _dockerSettings.CPUQuota,
                        CPUPeriod = _dockerSettings.CPUPeriod,
                        NetworkMode = _dockerSettings.NetworkMode
                    },
                    Tty = false
                }
            );

            await _docker.Containers.StartContainerAsync(container.ID, null);

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

            var (stdout, stderr) = await stream.ReadOutputToEndAsync(default);
            await _docker.Containers.WaitContainerAsync(container.ID);
            string output = stdout + stderr;

            await _docker.Containers.RemoveContainerAsync(
                container.ID,
                new ContainerRemoveParameters
                {
                    Force = true
                }
            );

            try { File.Delete(filePath); } catch { }

            return new RunResult
            {
                success = true,
                output = output
            };
        }

        private DockerRequest BuildLanguageRequest(string code, string lang)
        {
            var req = new DockerRequest
            {
                code = code,
                lang = lang
            };

            if (lang == "python")
            {
                req.image = _dockerSettings.PythonImage;
                req.tempPath = "/temp/pyexec";
                req.hostTempPath = $"{_dockerSettings.HostBasePath}/pyexec";
                req.filePath = "main.py";
                req.workPath = _dockerSettings.WorkDir;
                req.Cmd = new[] { "python", "/code/main.py" };
            }
            else if (lang == "javascript")
            {
                req.image = _dockerSettings.JSImage;
                req.tempPath = "/temp/jsexec";
                req.hostTempPath = $"{_dockerSettings.HostBasePath}/jsexec";
                req.filePath = "main.js";
                req.workPath = _dockerSettings.WorkDir;
                req.Cmd = new[] { "node", "/code/main.js" };
            }

            return req;
        }

        public async Task<RunResult> RunCode(string code, string lang)
        {
            var req = BuildLanguageRequest(code, lang);
            return await RunAsync(req);
        }
    }
}
