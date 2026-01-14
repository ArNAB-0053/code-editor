using backend.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.DTO
{
    public class CreateFileRequest
    {
        [BsonId]
        public string OwnerId { get; set; }
        public string FileName { get; set; } = string.Empty;
        public FileType FileType { get; set; } = FileType.FILE;
        public string? Lang { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string? ParentId { get; set; }
    }

    public class FileListRequest
    {
        public string OwnerId { get; set; }
        public bool? IsDeleted { get; set; } = false;
        public string? ParentId { get; set; } = null;
    }


    public class FileDetailsRequest
    {
        public string FileId { get; set; }
        public string OwnerId { get; set; }
    }

    // PATCHs
    public class UpdateRenameRequest
    {
        public string FileId { get; set; }
        public string OwnerId { get; set; }
        public string FileName { get; set; }
    }

    public class UpdateOuputRequest
    {
        public string FileId { get; set; }
        public string OwnerId { get; set; }
        public string Output { get; set; }
    }

    public class UpdateCodeRequest
    {
        public string FileId { get; set; }
        public string OwnerId { get; set; }
        public string Code { get; set; }
    }


    // Service DTOs
    public class FileWithCodeDTOTemp
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string OwnerId { get; set; }
        public string FileName { get; set; } 
        public FileType FileType { get; set; } 
        public string? Lang { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeleteTime { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string? ParentId { get; set; } 
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; }

        // Code Content
        public FileCodesModel? CodeContent { get; set; }
    }

    public class FileWithCodeDTO
    {
        // Code Content
        public List<FileWithCodeDTOTemp> Files { get; set; }
        public List<FilesModel> Folders { get; set; }
    }

    public class SoftDeleteRequest
    {
        public string FileId { get; set; }
        public string OwnerId { get; set; }
    }

    public class BreadcrumbDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
