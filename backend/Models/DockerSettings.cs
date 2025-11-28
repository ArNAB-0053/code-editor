namespace PythonEditor.Models
{
    public class DockerSettings
    {
        public string PythonImage { get; set; }
        public string JSImage { get; set; }
        public string JavaImage { get; set; }
        public string CImage { get; set; }
        public string CppImage { get; set; }
        public string CSharpImage { get; set; }
        public string TSImage { get; set; }
        public string HostBasePath { get; set; }
        public string WorkDir { get; set; }
        public string FileName { get; set; }
        public int MemoryLimitMB { get; set; }
        public int CPUQuota { get; set; }
        public int CPUPeriod { get; set; }
        public string NetworkMode { get; set; }
    }
}