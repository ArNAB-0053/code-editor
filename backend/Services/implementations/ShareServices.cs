using backend.config;
using backend.DTO;
using backend.Models;
using MongoDB.Driver;

namespace backend.Services.implementations
{
    public class ShareServices
    {
        private readonly IMongoCollection<ShareModel> _share;
        private readonly IMongoCollection<CodeSaveModel> _code;

        public ShareServices(IConfiguration config)
        {
            var settings = config.GetSection("DatabaseSettings").Get<MongoSettings>();
            var client = new MongoClient(settings.MongoURI);
            var db = client.GetDatabase(settings.DatabaseName);

            _share = db.GetCollection<ShareModel>(settings.ShareCollectionName);
            _code = db.GetCollection<CodeSaveModel>(settings.CodeSaveCollectionName);
        }

        // CREATE SHARE - Snapshot
        public ShareModel CreateShare(CreateShareRequest req)
        {
            var editorData = _code
                .Find(x => x.Id == req.EditorId)
                .FirstOrDefault();

            if (editorData == null)
                throw new Exception("Editor not found");

            var share = new ShareModel
            {
                SharedId = Guid.NewGuid().ToString("N").Substring(0, 12), 
                EditorId = editorData.Id,
                OwnerId = editorData.UserId,
                Code = editorData.Code,
                Lang = editorData.Lang,
                Output = editorData.Output,
                AllowedUsers = req.AllowedUsers
            };

            _share.InsertOne(share);
            return share;
        }

        // GET SHARED DATA
        public ShareModel GetShare(string shareId, string? userId)
        {
            var share = _share.Find(x => x.SharedId == shareId).FirstOrDefault();

            if (share == null)
                throw new Exception("Invalid share link");

            // If revoked
            if (share.IsRevoked)
                throw new Exception("This share link has been revoked");

            if (share.Visibility == ShareVisibility.Private)
            {
                if (string.IsNullOrEmpty(userId))
                    throw new Exception("Login required to access this private share");

                if (!share.AllowedUsers.Contains(userId))
                    throw new Exception("You don't have permission to view this private share");
            }

            return share;
        }
    }
}
