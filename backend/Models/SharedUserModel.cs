using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class SharedUserModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string SharedId { get; set; }  
        public string UserId { get; set; }    
        public string OwnerId { get; set; }
        //public SharePermission Permission { get; set; } = SharePermission.View;

        public DateTime GrantedAt { get; set; } = DateTime.UtcNow;
    }
}
