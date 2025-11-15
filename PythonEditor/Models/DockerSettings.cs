namespace PythonEditor.Models
{
    public class DockerSettings
    {
        public string PythonImage { get; set; }
        public string WorkDir { get; set; }
        public string FileName { get; set; }
        public int MemoryLimitMB { get; set; }
        public int CPUQuota { get; set; }
        public int CPUPeriod { get; set; }
        public string NetworkMode { get; set; }
    }
}
