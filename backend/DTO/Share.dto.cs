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

    public class UserSearchResult
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Email { get; set; } 
    }

}
