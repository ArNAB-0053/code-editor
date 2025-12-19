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

    public class ShareByMeItemRequest
    {
        public string OwnerId { get; set; }
        public string SharedId { get; set; }
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
        public string? MobileNo { get; set; }
    }

    public class ShareByMeDtoTemp
    {
        public ShareModel Share { get; set; }
        public List<UserBasicDto> SharedWith { get; set; }
    }

    public class ShareByMeDto
    {
        public List<ShareByMeDtoTemp> Remaining { get; set; }
        public ShareModel Share { get; set; }
        public List<UserBasicDto> SharedWith { get; set; }
    }

    public class ShareWithMeDTO {
        public ShareModel Share { get; set; }
        public List<ShareModel> Remaining { get; set; }
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

    public class ShareGroupTemp
    {
        public string SharedId { get; set; } = null!;
        public List<string> UserIds { get; set; } = new();
        public List<ShareModel> Share { get; set; } = new();
        public List<AuthModel> Users { get; set; } = new();
    }


    public class SharedWithShareTemp
    {
        public string SharedId { get; set; } = null!;
        public string OwnerId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public List<ShareModel> Share { get; set; } = new();
    }

    public class GroupResult
    {
        public string SharedId { get; set; }
        public List<string> UserIds { get; set; }
        public List<ShareModel> Shares { get; set; }
    }

    public class UnwindedResult
    {
        public string SharedId { get; set; }
        public List<string> UserIds { get; set; }
        public ShareModel Share { get; set; }
        public List<AuthModel> Users { get; set; }
    }

}
