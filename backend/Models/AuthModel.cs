using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class AuthModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string? Id { get; set; }
        public NameDto Name { get; set; }
        public string? Password { get; set; }
        public string Email { get; set; }
        public ProviderEnum Provider { get; set; } = ProviderEnum.NORMAL;
        public string? ProviderId { get; set; }
        public string Username { get; set; } = string.Empty;
        //public string Initials { get; set; }
        public string? MobileNo { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ProviderEnum
    {
        NORMAL = 0,
        GOOGLE = 1,
        GITHUB = 2
    }

    public class NameDto
    {
        public string FirstName { get; set; }
        public string? MiddleName { get; set; } = string.Empty;
        public string LastName { get; set; }
    }

    public class SignInRequest
    {
        public string Identifier { get; set; }
        public string Password { get; set; }
    }
}
