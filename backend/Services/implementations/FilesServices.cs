using System.Threading.Tasks;
using backend.config;
using backend.DTO;
using backend.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend.Services.implementations
{
    public class FilesServices
    {
        private readonly IMongoCollection<FilesModel> _files;
        private readonly IMongoCollection<FileCodesModel> _filesCode;

        public FilesServices(IConfiguration config)
        {
            var settings = config.GetSection("DatabaseSettings").Get<MongoSettings>();
            var client = new MongoClient(settings?.MongoURI);
            var db = client.GetDatabase(settings?.DatabaseName);
            _files = db.GetCollection<FilesModel>(settings?.FilesCollectionName);
            _filesCode = db.GetCollection<FileCodesModel>(settings?.FilesCodeCollectionName);
        }

        // -------------------------------
        //             CRUD
        // -------------------------------

        // CREATE / ADD file
        public async Task<FilesModel> Create(FilesModel file)
        {
            await _files.InsertOneAsync(file);

            if (file.Id == null)
            {
                throw new Exception("Failed to create file: ID is null after insertion.");
            }

            if (file.FileType == FileType.FILE)
            {
                var fileCode = new FileCodesModel
                {
                    FileId = file.Id!,
                    FileName = file.FileName,
                    OwnerId = file.OwnerId,
                    Output = string.Empty,
                    Code = string.Empty,
                    Lang = file.Lang ?? "python",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                await _filesCode.InsertOneAsync(fileCode);
            }
            return file;
        }

        // GET all files - based on OwnerId - (LIST)
        public FileWithCodeDTO GetAllFiles(string ownerId, bool IsDeleted, string? parentId)
        {
            var baseMatch = new BsonDocument
            {
                { "OwnerId", ownerId },
                { "IsDeleted", IsDeleted }
            };

            if (!IsDeleted)
                    {
                        baseMatch.Add(
                            "ParentId",
                            parentId == null
                                ? BsonNull.Value
                                : new ObjectId(parentId)
                        );
                    }

            var pipeline = new[]
                    {
                new BsonDocument("$facet",
                    new BsonDocument
                    {
                        {
                            "Files", new BsonArray
                            {
                                new BsonDocument("$match",
                                    new BsonDocument(baseMatch)
                                    {
                                        { "FileType", "FILE" }
                                    }),
                                new BsonDocument("$sort", new BsonDocument("_id", -1)),
                                new BsonDocument("$lookup",
                                    new BsonDocument
                                    {
                                        { "from", "filesCode" },
                                        { "localField", "_id" },
                                        { "foreignField", "FileId" },
                                        { "as", "CodeContent" }
                                    }),
                                new BsonDocument("$unwind", "$CodeContent")
                            }
                        },
                        {
                            "Folders", new BsonArray
                            {
                                new BsonDocument("$match",
                                    new BsonDocument(baseMatch)
                                    {
                                        { "FileType", "FOLDER" }
                                    }),
                                new BsonDocument("$sort", new BsonDocument("_id", -1))
                            }
                        }
                    })
            };

            return _files.Aggregate<FileWithCodeDTO>(pipeline).FirstOrDefault();
        }

        // GET file by Id - based on fileId + ownerId - (DETAILS)
        public FileWithCodeDTO GetById(string fileId, string ownerId)
        {
            var pipeline = new[]
                    {
                        new BsonDocument("$match",
                        new BsonDocument
                            {
                                { "OwnerId", ownerId },
                                { "_id",
                        new ObjectId(fileId) }
                            }),
                        new BsonDocument("$lookup",
                        new BsonDocument
                            {
                                { "from", "filesCode" },
                                { "localField", "_id" },
                                { "foreignField", "FileId" },
                                { "as", "CodeContent" }
                            }),
                        new BsonDocument("$unwind", "$CodeContent")
                    };
            var result = _files.Aggregate<FileWithCodeDTO>(pipeline).FirstOrDefault();
            return result;
        }

        // GET files code using fileId
        public FileCodesModel GetFilesCode(string fileId, string ownerId) => _filesCode.Find(x => x.FileId == fileId && x.OwnerId == ownerId).FirstOrDefault();

        // PATCH - rename file name
        public void Rename(string id, string ownerId, string fileName)
        {
            var updateCode = Builders<FileCodesModel>.Update
                .Set(x => x.FileName, fileName)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);

            var updateFile = Builders<FilesModel>.Update
                .Set(x => x.FileName, fileName)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);

            _filesCode.UpdateOne(x => x.FileId == id && x.OwnerId == ownerId, updateCode);
            _files.UpdateOne(x => x.Id == id && x.OwnerId == ownerId, updateFile);
        }

        // PATCH - Update only Code
        public FileCodesModel UpdateCode(string id, string ownerId, string code)
        {
            var update = Builders<FileCodesModel>.Update
                .Set(x => x.Code, code)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);

            _filesCode.UpdateOne(x => x.FileId == id && x.OwnerId == ownerId, update);
            return GetFilesCode(id, ownerId);
        }

        // PATCH - Update only Output
        public bool UpdateOutput(string id, string ownerId, string output)
        {
            var update = Builders<FileCodesModel>.Update
                .Set(x => x.Output, output)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);

            var res = _filesCode.UpdateOne(x => x.FileId == id && x.OwnerId == ownerId, update);
            return res.ModifiedCount > 0;
        }

        // SOFT DELETE - Trash (Recycle Bin)
        public async Task<bool> SoftDelete(string fileId, string ownerId)
        {
            var filter = Builders<FilesModel>.Filter.And(
                    Builders<FilesModel>.Filter.Eq(x => x.Id, fileId),
                    Builders<FilesModel>.Filter.Eq(x => x.OwnerId, ownerId),
                    Builders<FilesModel>.Filter.Eq(x => x.IsDeleted, false)
                );

            var update = Builders<FilesModel>.Update
                .Set(x => x.IsDeleted, true)
                .Set(x => x.DeleteTime, DateTime.UtcNow)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);

            var result = await _files.UpdateOneAsync(filter, update);
            return result.ModifiedCount > 0;
        }

        // RESTORE
        public async Task<bool> Restore(string fileId, string ownerId)
        {
            var filter = Builders<FilesModel>.Filter.And(
                    Builders<FilesModel>.Filter.Eq(x => x.Id, fileId),
                    Builders<FilesModel>.Filter.Eq(x => x.OwnerId, ownerId),
                    Builders<FilesModel>.Filter.Eq(x => x.IsDeleted, true)
                );

            var update = Builders<FilesModel>.Update
                .Set(x => x.IsDeleted, false)
                .Set(x => x.DeleteTime, null)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);

            var result = await _files.UpdateOneAsync(filter, update);
            return result.ModifiedCount > 0;
        }

        // Breadcrumbs
        public async Task<List<BreadcrumbDto>> GetBreadcrumbs(string folderId)
        {
            var breadcrumbs = new List<BreadcrumbDto>();
            string? currentId = folderId;

            while (currentId != null)
            {
                var folder = await _files
                    .Find(x => x.Id == currentId)
                    .Project(x => new { x.Id, x.FileName, x.ParentId })
                    .FirstOrDefaultAsync();

                if (folder == null) break;

                breadcrumbs.Insert(0, new BreadcrumbDto
                {
                    Id = folder.Id,
                    Name = folder.FileName
                });

                currentId = folder.ParentId;
            }

            return breadcrumbs;
        }

    }
}
