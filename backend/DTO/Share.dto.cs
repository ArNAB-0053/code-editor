namespace backend.DTO
{
    public class CreateShareRequest
    {
        public string EditorId { get; set; }
        public string SharedByUserId { get; set; } 
        public int ShareLimit { get; set; } = 5;
        public int ExpireMinutes { get; set; } = 60; 
    }
    public class GetShareRequest
    {
        public string SharedId { get; set; }
        public string? CurrentUserId { get; set; }
    }
}
