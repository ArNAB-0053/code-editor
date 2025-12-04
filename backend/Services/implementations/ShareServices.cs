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
                SharedByUserId = req.SharedByUserId,
                Code = editorData.Code,
                Lang = editorData.Lang,
                Output = editorData.Output,
                ShareLimit = req.ShareLimit,
                CurrentShareCount = 0,
                ExpiresAt = req.ExpireMinutes > 0 ? DateTime.UtcNow.AddMinutes(req.ExpireMinutes) : null
            };

            _share.InsertOne(share);
            return share;
        }

        // GET SHARED DATA
        public ShareModel GetShare(string sharedId)
        {
            var share = _share.Find(x => x.SharedId == sharedId).FirstOrDefault();

            if (share == null)
                throw new Exception("Invalid share link");

            // If revoked
            if (share.IsRevoked)
                throw new Exception("This share link has been revoked");

            // If expired
            if (share.ExpiresAt != null && share.ExpiresAt < DateTime.UtcNow)
                throw new Exception("Share link expired");

            return share;
        }
    }
}
