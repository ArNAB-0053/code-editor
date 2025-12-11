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
        public string OwnerId { get; set; }   
        public string SharedByUserId { get; set; } 
        public List<string> SharedToUsers { get; set; } = new();

        public string Code { get; set; }
        public string Lang { get; set; }

        public string Output { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int ShareLimit { get; set; } = 5; 
        public int CurrentShareCount { get; set; } = 0;

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
