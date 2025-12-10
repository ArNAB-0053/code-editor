namespace PythonEditor.Models
{
    public class DockerRequest
    {
        public string code { get; set; }
        public string lang { get; set; }

        public string tempPath { get; set; }
        public string hostTempPath { get; set; }
        public string image { get; set; }
        public string filePath { get; set; }
        public string workPath { get; set; }
        public string[] Cmd { get; set; }
    }

    public class RunRequest
    {
        public string code { get; set; }
        public string lang { get; set; }
    }
}