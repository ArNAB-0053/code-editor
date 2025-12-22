using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class FilesModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string OwnerId { get; set; } // User Id - who owns this code file ( I am keeping it string as previously User Id is string - later will be replace with ObjectId)
        public string FileName { get; set; } = string.Empty;

        [BsonRepresentation(BsonType.String)]
        public FileType FileType { get; set; } = FileType.FILE; // file / folder

        public string? Lang { get; set; } // eg: python(.py), javascript(.js), java(.java) etc.

        [BsonRepresentation(BsonType.ObjectId)]
        public string? ParentId { get; set; } // Parent Folder Id
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public enum FileType
    {
        FILE = 0, // 0
        FOLDER = 1 // 1
    }
}
