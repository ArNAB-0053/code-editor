using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class CodeSaveModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string? Id { get; set; }
        public string UserId { get; set; }
        public string Code { get; set; }
        public string Lang { get; set; }
        public string Output { get; set; } = string.Empty;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class GetCodeRequest
    {
        public string UserId { get; set; }
        public string Lang { get; set; }
    }

    public class SaveCodeRequest
    {
        public string UserId { get; set; }
        public string Lang { get; set; }
        public string Code { get; set; }
    }

    public class UpdateOutputRequest
    {
        public string Output { get; set; }
    }

}
