using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class SocialModal
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string? Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; } = null!;

        public string GithubUsername { get; set; }
        public string? AvatarUrl { get; set; }
        public string? GithubFullName { get; set; }
        public string Provider { get; set; }
        public string ProviderId { get; set; }
        public string Scope { get; set; } = null!;

        public string AccessToken { get; set; } = null!;
        public string? RefreshToken { get; set; }

        public DateTime ConnectedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
