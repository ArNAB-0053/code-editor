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
                    OwnerId = file.OwnerId,
                    Output = string.Empty,
                    Code = string.Empty,
                    Lang = file.Lang,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                await _filesCode.InsertOneAsync(fileCode);
            }
            return file;
        }

        // GET all files - based on OwnerId - (LIST)
        public FileWithCodeDTO GetAllFiles(string ownerId, bool IsDeleted)
        {
            var pipeline = new[]
                    {
                        new BsonDocument("$facet",
                        new BsonDocument
                            {
                                { "Files",
                        new BsonArray
                                {
                                    new BsonDocument("$match",
                                    new BsonDocument
                                        {
                                            { "OwnerId", ownerId },
                                            { "FileType", "FILE" },
                                            { "IsDeleted", IsDeleted }
                                        }),
                                    new BsonDocument("$sort",
                                    new BsonDocument("_id", -1)),
                                    new BsonDocument("$lookup",
                                    new BsonDocument
                                        {
                                            { "from", "filesCode" },
                                            { "localField", "_id" },
                                            { "foreignField", "FileId" },
                                            { "as", "CodeContent" }
                                        }),
                                    new BsonDocument("$unwind", "$CodeContent")
                                } },
                                { "Folders",
                        new BsonArray
                                {
                                    new BsonDocument("$match",
                                    new BsonDocument
                                        {
                                            { "OwnerId", ownerId },
                                            { "FileType", "FOLDER" },
                                            { "IsDeleted", IsDeleted }
                                        }),
                                    new BsonDocument("$sort",
                                    new BsonDocument("_id", -1)),
                                } },
                            })
                    };

            var result = _files.Aggregate<FileWithCodeDTO>(pipeline).FirstOrDefault();
            return result;
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
    }
}
