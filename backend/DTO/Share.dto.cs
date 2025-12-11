using backend.Models;

namespace backend.DTO
{
    public class CreateShareRequest
    {
        public string EditorId { get; set; }
        public List<string>? AllowedUsers { get; set; } = new();
        public ShareVisibility Visibility { get; set; }
    }
    public class GetShareRequest
    {
        public string ShareId { get; set; }
        public string? CurrentUserId { get; set; }
    }
}
