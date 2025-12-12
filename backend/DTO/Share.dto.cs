using backend.Models;

namespace backend.DTO
{
    public class CreateShareRequest
    {
        public string EditorId { get; set; }
        public List<string>? AllowedUsers { get; set; } = new();
        public ShareVisibility Visibility { get; set; }
        public OwnerDetails OwnerDetails { get; set; }
    }
    public class GetShareRequest
    {
        public string ShareId { get; set; }
        public string? CurrentUserId { get; set; }
    }

    public class UserIdRequest
    {
        public string UserId { get; set; }
    }

    public class OwnerDetails
    {        
        public string UserId { get; set; }
        public NameDto Name { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        //public string Initials { get; set; }
        public string? MobileNo { get; set; }
    }
}
