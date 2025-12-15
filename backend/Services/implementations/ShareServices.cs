using backend.config;
using backend.DTO;
using backend.Models;
using MongoDB.Driver;
using Pipelines.Sockets.Unofficial.Buffers;

namespace backend.Services.implementations
{
    public class ShareServices
    {
        private readonly IMongoCollection<ShareModel> _share;
        private readonly IMongoCollection<CodeSaveModel> _code;
        private readonly IMongoCollection<SharedUserModel> _sharedUser;
        private readonly IMongoCollection<AuthModel> _users;

        public ShareServices(IConfiguration config)
        {
            var settings = config.GetSection("DatabaseSettings").Get<MongoSettings>();
            var client = new MongoClient(settings.MongoURI);
            var db = client.GetDatabase(settings.DatabaseName);

            _share = db.GetCollection<ShareModel>(settings.ShareCollectionName);
            _code = db.GetCollection<CodeSaveModel>(settings.CodeSaveCollectionName);
            _sharedUser = db.GetCollection<SharedUserModel>(settings.SharedUserCollectionName);
            _users = db.GetCollection<AuthModel>(settings?.AuthCollectionName);
        }

        // CREATE SHARE - Snapshot
        public ShareModel CreateShare(CreateShareRequest req)
        {
            var editorData = _code
                .Find(x => x.Id == req.EditorId)
                .FirstOrDefault();

            if (editorData == null)
                throw new Exception("Editor not found");

            string sharedId = Guid.NewGuid().ToString("N").Substring(0, 12);

            var share = new ShareModel
            {
                SharedId = sharedId, 
                EditorId = editorData.Id,
                OwnerDetails = req.OwnerDetails,
                Code = editorData.Code,
                Lang = editorData.Lang,
                Output = editorData.Output,
                //AllowedUsers = req.AllowedUsers,
                Visibility = req.Visibility
            };

            _share.InsertOne(share);

            if (req.AllowedUsers?.Any() == true)
            {
                var sharedUsers = req.AllowedUsers
                    .Select(userId => new SharedUserModel
                    {
                        SharedId = sharedId,
                        UserId = userId,
                        OwnerId = req.OwnerDetails.UserId
                    })
                    .ToList();

                _sharedUser.InsertMany(sharedUsers);
            }

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
                    throw new Exception("Login required");

                var hasAccess = _sharedUser.Find(x =>
                    x.SharedId == shareId && x.UserId == userId
                ).Any();

                if (!hasAccess)
                    throw new Exception("You don't have permission");
            }

            return share;
        }

        // GET - all the codes share by UserId
        public List<ShareByMeDto> GetAllShareByUser(string ownerId)
        {
            var sharedUserRecords = _sharedUser
                .Find(su => su.OwnerId == ownerId)
                .ToList();

            var groupedByShare = sharedUserRecords
                .GroupBy(su => su.SharedId)
                .ToList();

            var result = new List<ShareByMeDto>();

            foreach (var group in groupedByShare)
            {
                var sharedId = group.Key;
                var userIds = group.Select(su => su.UserId).ToList();

                var share = _share
                    .Find(s => s.SharedId == sharedId)
                    .FirstOrDefault();

                if (share == null) continue;

                var users = _users
                    .Find(u => userIds.Contains(u.Id))
                    .ToList();

                result.Add(new ShareByMeDto
                {
                    Share = share,
                    SharedWith = users.Select(u => new UserBasicDto
                    {
                        UserId = u.Id!,
                        Name = u.Name,
                        Username = u.Username,
                        Email = u.Email
                    }).ToList()
                });
            }

            return result;
        }

        // GET - all the codes share to UserId

        // ------------------------------------------------
        //   BOTH WORKS - But Aggregation always better
        // ------------------------------------------------

        // With NORMAL LOOP
        //public List<ShareModel> GetAllShareToUser(string userId)
        //{
        //    var shares = _sharedUser.Find(s => s.UserId == userId).ToList();
        //    var res = new List<ShareModel>();

        //    foreach (var share in shares)
        //    {
        //        var shareDetails = _share.Find(s => s.SharedId == share.SharedId).FirstOrDefault();
        //        res.Add(shareDetails);
        //    }

        //    return res;
        //}

        // With AGGREGATION PIPELINE
        public List<ShareModel> GetAllShareToUser(string userId)
        {
            var pipeline = _sharedUser.Aggregate()
                .Match(s => s.UserId == userId)
                .Lookup<SharedUserModel, ShareModel, ShareToMeAgg>(
                    _share,
                    su => su.SharedId,
                    s => s.SharedId,
                    res => res.Share
                )
                .ToList();

            return pipeline.SelectMany(x => x.Share).ToList();
        }
    }
}
