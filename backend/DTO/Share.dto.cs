using backend.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

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

    [BsonIgnoreExtraElements]
    public class ShareWithUsersTemp
    {
        public List<SharedUserModel> Shares { get; set; }
        public List<SharedUserModel> SharedUsers { get; set; }
        public List<AuthModel> Users { get; set; }
    }

    public class UserBasicDto
    {
        public string UserId { get; set; }
        public NameDto Name { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
    }

    public class ShareByMeDto
    {
        public ShareModel Share { get; set; }
        public List<UserBasicDto> SharedWith { get; set; }
    }

    [BsonIgnoreExtraElements]
    public class ShareByMeTemp
    {
        //public string SharedId { get; set; }
        //public string UserId { get; set; }
        //public string OwnerId { get; set; }

        public SharedUserModel SharedUser { get; set; }
        public List<ShareModel> Shares { get; set; }
        public List<AuthModel> Users { get; set; } = new();
    }

    [BsonIgnoreExtraElements]
    public class ShareToMeAgg
    {
        public List<ShareModel> Share { get; set; }
    }

}
