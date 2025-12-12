using backend.DTO;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class ShareModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string SharedId { get; set; }  
        public string EditorId { get; set; }  
        public OwnerDetails OwnerDetails { get; set; }   
        public string SharedByUserId { get; set; } 
        public List<string> AllowedUsers { get; set; } = new();

        public string Code { get; set; }
        public string Lang { get; set; }

        public string Output { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? ExpiresAt { get; set; } 
        public bool IsRevoked { get; set; } = false;
        public ShareVisibility Visibility { get; set; } = ShareVisibility.Private;
    }

    public enum ShareVisibility
    {
        Public,
        Private
    }
}
