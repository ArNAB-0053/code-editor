using backend.config;
using backend.DTO;
using backend.Models;
using MongoDB.Bson;
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

        // (CREATE) SHARE - "Snapshot"
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

        // (GET) SHARED DATA (sharedWithMe)
        public ShareWithMeDTO GetShare(string shareId, string? userId)
        {
            var pipeline = new[]
                    {
                        new BsonDocument("$facet",
                        new BsonDocument
                            {
                                { "Remaining",
                        new BsonArray
                                {
                                    new BsonDocument("$match",
                                    new BsonDocument("UserId", "69383151691997054ab69989")),
                                    new BsonDocument("$lookup",
                                    new BsonDocument
                                        {
                                            { "from", "share" },
                                            { "localField", "SharedId" },
                                            { "foreignField", "SharedId" },
                                            { "as", "Share" }
                                        }),
                                    new BsonDocument("$unwind", "$Share"),
                                    new BsonDocument("$replaceRoot",
                                    new BsonDocument("newRoot", "$Share"))
                                } },
                                { "Share",
                        new BsonArray
                                {
                                    new BsonDocument("$match",
                                    new BsonDocument
                                        {
                                            { "UserId", "69383151691997054ab69989" },
                                            { "SharedId", "30297d525d09" }
                                        }),
                                    new BsonDocument("$lookup",
                                    new BsonDocument
                                        {
                                            { "from", "share" },
                                            { "localField", "SharedId" },
                                            { "foreignField", "SharedId" },
                                            { "as", "Share" }
                                        }),
                                    new BsonDocument("$unwind", "$Share"),
                                    new BsonDocument("$replaceRoot",
                                    new BsonDocument("newRoot", "$Share"))
                                } }
                            }),
                        new BsonDocument("$project",
                        new BsonDocument
                            {
                                { "Remaining", "$Remaining" },
                                { "Share",
                        new BsonDocument("$arrayElemAt",
                        new BsonArray
                                    {
                                        "$Share",
                                        0
                                    }) }
                            })
                    };
            var result = _sharedUser
                .Aggregate<ShareWithMeDTO>(pipeline)
                .FirstOrDefault();

            return result;
        }

        // ---------------------------------------------------------------------------------------
        // +++++++++++[                             LIST                              ]+++++++++++
        // ---------------------------------------------------------------------------------------

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //                  (GET) - all the codes share by User - (sharedByMe)
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        //public List<ShareByMeDto> GetAllShareByUser(string ownerId)
        //{
        //    var sharedUserRecords = _sharedUser
        //        .Find(su => su.OwnerId == ownerId)
        //        .ToList();

        //    var groupedByShare = sharedUserRecords
        //        .GroupBy(su => su.SharedId)
        //        .ToList();

        //    var result = new List<ShareByMeDto>();

        //    foreach (var group in groupedByShare)
        //    {
        //        var sharedId = group.Key;
        //        var userIds = group.Select(su => su.UserId).ToList();

        //        var share = _share
        //            .Find(s => s.SharedId == sharedId)
        //            .FirstOrDefault();

        //        if (share == null) continue;

        //        var users = _users
        //            .Find(u => userIds.Contains(u.Id))
        //            .ToList();

        //        result.Add(new ShareByMeDto
        //        {
        //            Share = share,
        //            SharedWith = users.Select(u => new UserBasicDto
        //            {
        //                UserId = u.Id!,
        //                Name = u.Name,
        //                Username = u.Username,
        //                Email = u.Email
        //            }).ToList()
        //        });
        //    }

        //    return result;
        //}

        public List<ShareByMeDto> GetAllShareByUser(string ownerId)
        {
            var pipeline = new[]
                {
                    new BsonDocument("$match",
                    new BsonDocument("OwnerId", ownerId)),
                    new BsonDocument("$lookup",
                    new BsonDocument
                        {
                            { "from", "share" },
                            { "localField", "SharedId" },
                            { "foreignField", "SharedId" },
                            { "as", "Share" }
                        }),
                    new BsonDocument("$unwind", "$Share"),
                    new BsonDocument("$lookup",
                    new BsonDocument
                        {
                            { "from", "users" },
                            { "let",
                    new BsonDocument("userId",
                    new BsonDocument("$toObjectId", "$UserId")) },
                            { "pipeline",
                    new BsonArray
                            {
                                new BsonDocument("$match",
                                new BsonDocument("$expr",
                                new BsonDocument("$eq",
                                new BsonArray
                                            {
                                                "$_id",
                                                "$$userId"
                                            })))
                            } },
                            { "as", "SharedWith" }
                        }),
                    new BsonDocument("$unwind", "$SharedWith"),
                    new BsonDocument("$group",
                    new BsonDocument
                        {
                            { "_id", "$Share.SharedId" },
                            { "Share",
                    new BsonDocument("$first", "$Share") },
                            { "SharedWith",
                    new BsonDocument("$push",
                    new BsonDocument
                                {
                                    { "UserId",
                    new BsonDocument("$toString", "$SharedWith._id") },
                                    { "Name", "$SharedWith.Name" },
                                    { "Username", "$SharedWith.Username" },
                                    { "MobileNo", "$SharedWith.MobileNo" },
                                    { "Email", "$SharedWith.Email" }
                                }) }
                        }),
                    new BsonDocument("$project",
                    new BsonDocument
                        {
                            { "_id", 0 },
                            { "Share", 1 },
                            { "SharedWith", 1 }
                        })
                };

            var result = _sharedUser
                .Aggregate<ShareByMeDto>(pipeline)
                .ToList();

            return result;
        }

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //                 (GET) - all the codes share with UserId - (sharedWithMe)
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        // --------------------------------------------------------------------
        //    ALL WORKS - But Aggregation always better, and best using Bson
        // --------------------------------------------------------------------

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

        //public List<ShareModel> GetAllShareToUser(string userId)
        //{
        //    var pipeline = _sharedUser.Aggregate()
        //        .Match(s => s.UserId == userId)
        //        .Lookup<SharedUserModel, ShareModel, ShareToMeAgg>(
        //            _share,
        //            su => su.SharedId,
        //            s => s.SharedId,
        //            res => res.Share
        //        )
        //        .ToList();

        //    return pipeline.SelectMany(x => x.Share).ToList();
        //}

        // (BEST WAY) - (USING Bson) - It can be generated from MongoDB Compass - after writting the aggregation inside compass it can be generated.
        public List<ShareModel> GetAllShareToUser(string userId)
        {
            var pipeline = new[]
                    {
                        new BsonDocument("$match",
                        new BsonDocument("UserId", userId)),
                        new BsonDocument("$lookup",
                        new BsonDocument
                            {
                                { "from", "share" },
                                { "localField", "SharedId" },
                                { "foreignField", "SharedId" },
                                { "as", "Share" }
                            }),
                        new BsonDocument("$unwind", "$Share"),
                        new BsonDocument("$replaceRoot",
                        new BsonDocument("newRoot", "$Share"))
                    };

            var result = _sharedUser
                .Aggregate<ShareModel>(pipeline)
                .ToList();

            return result;
        }

        // ---------------------------------------------------------------------------------------
        // +++++++++++[                             DETAILS                           ]+++++++++++
        // ---------------------------------------------------------------------------------------

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //                 (GET) - details based on "ownerId" and "sharedId" - (sharedByMe)
        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        //public ShareByMeDto GetDetailsOfShareByMeItem(string ownerId, string shareId)
        //{
        //    var sharedUserRecords = _sharedUser
        //        .Find(su => su.OwnerId == ownerId && su.SharedId == shareId)
        //        .ToList();

        //    var result = new ShareByMeDto();
        //    var userIds = sharedUserRecords.Select(su => su.UserId).ToList();

        //    var share = _share
        //            .Find(s => s.SharedId == shareId)
        //            .FirstOrDefault();

        //    var users = _users
        //            .Find(u => userIds.Contains(u.Id))
        //            .ToList();

        //    result = new ShareByMeDto
        //        {
        //            Share = share,
        //            SharedWith = users.Select(u => new UserBasicDto
        //            {
        //                UserId = u.Id!,
        //                Name = u.Name,
        //                Username = u.Username,
        //                Email = u.Email
        //            }).ToList()
        //        };
        //    return result;
        //}

        public ShareByMeDto GetDetailsOfShareByMeItem(string ownerId, string shareId)
        {
            var pipeline = new[]
                {
                    new BsonDocument("$facet",
                    new BsonDocument
                        {
                            { "Remaining",
                    new BsonArray
                            {
                                new BsonDocument("$match",
                                new BsonDocument
                                    {
                                        { "OwnerId", ownerId },
                                        { "SharedId",
                                new BsonDocument("$ne", shareId) }
                                    }),
                                new BsonDocument("$lookup",
                                new BsonDocument
                                    {
                                        { "from", "share" },
                                        { "localField", "SharedId" },
                                        { "foreignField", "SharedId" },
                                        { "as", "Share" }
                                    }),
                                new BsonDocument("$unwind", "$Share"),
                                new BsonDocument("$lookup",
                                new BsonDocument
                                    {
                                        { "from", "users" },
                                        { "let",
                                new BsonDocument("userId",
                                new BsonDocument("$toObjectId", "$UserId")) },
                                        { "pipeline",
                                new BsonArray
                                        {
                                            new BsonDocument("$match",
                                            new BsonDocument("$expr",
                                            new BsonDocument("$eq",
                                            new BsonArray
                                                        {
                                                            "$_id",
                                                            "$$userId"
                                                        })))
                                        } },
                                        { "as", "SharedWith" }
                                    }),
                                new BsonDocument("$unwind", "$SharedWith"),
                                new BsonDocument("$group",
                                new BsonDocument
                                    {
                                        { "_id", "$Share.SharedId" },
                                        { "Share",
                                new BsonDocument("$first", "$Share") },
                                        { "SharedWith",
                                new BsonDocument("$push",
                                new BsonDocument
                                            {
                                                { "UserId",
                                new BsonDocument("$toString", "$SharedWith._id") },
                                                { "Name", "$SharedWith.Name" },
                                                { "Username", "$SharedWith.Username" },
                                                { "MobileNo", "$SharedWith.MobileNo" },
                                                { "Email", "$SharedWith.Email" }
                                            }) }
                                    }),
                                new BsonDocument("$project",
                                new BsonDocument
                                    {
                                        { "_id", 0 },
                                        { "Share", 1 },
                                        { "SharedWith", 1 }
                                    })
                            } },
                            { "ShareDetails",
                    new BsonArray
                            {
                                new BsonDocument("$match",
                                new BsonDocument
                                    {
                                        { "OwnerId", ownerId },
                                        { "SharedId", shareId }
                                    }),
                                new BsonDocument("$lookup",
                                new BsonDocument
                                    {
                                        { "from", "share" },
                                        { "localField", "SharedId" },
                                        { "foreignField", "SharedId" },
                                        { "as", "Share" }
                                    }),
                                new BsonDocument("$unwind", "$Share"),
                                new BsonDocument("$lookup",
                                new BsonDocument
                                    {
                                        { "from", "users" },
                                        { "let",
                                new BsonDocument("userId",
                                new BsonDocument("$toObjectId", "$UserId")) },
                                        { "pipeline",
                                new BsonArray
                                        {
                                            new BsonDocument("$match",
                                            new BsonDocument("$expr",
                                            new BsonDocument("$eq",
                                            new BsonArray
                                                        {
                                                            "$_id",
                                                            "$$userId"
                                                        })))
                                        } },
                                        { "as", "SharedWith" }
                                    }),
                                new BsonDocument("$unwind", "$SharedWith"),
                                new BsonDocument("$group",
                                new BsonDocument
                                    {
                                        { "_id", 0 },
                                        { "Share",
                                new BsonDocument("$first", "$Share") },
                                        { "SharedWith",
                                new BsonDocument("$push",
                                new BsonDocument
                                            {
                                                { "UserId",
                                new BsonDocument("$toString", "$SharedWith._id") },
                                                { "Name", "$SharedWith.Name" },
                                                { "Username", "$SharedWith.Username" },
                                                { "Email", "$SharedWith.Email" },
                                                { "MobileNo", "$SharedWith.MobileNo" }
                                            }) }
                                    }),
                                new BsonDocument("$project",
                                new BsonDocument
                                    {
                                        { "_id", 0 },
                                        { "Share", 1 },
                                        { "SharedWith", 1 }
                                    })
                            } }
                        }),
                    new BsonDocument("$project",
                    new BsonDocument
                        {
                            { "_id", 0 },
                            { "Remaining", "$Remaining" },
                            { "Share",
                    new BsonDocument("$arrayElemAt",
                    new BsonArray
                                {
                                    "$ShareDetails.Share",
                                    0
                                }) },
                            { "SharedWith",
                    new BsonDocument("$arrayElemAt",
                    new BsonArray
                                {
                                    "$ShareDetails.SharedWith",
                                    0
                                }) }
                        })
                };

            var result = _sharedUser
                .Aggregate<ShareByMeDto>(pipeline)
                .FirstOrDefault();

            return result;
        }
    }
}
