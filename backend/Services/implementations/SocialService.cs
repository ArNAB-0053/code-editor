using backend.config;
using backend.DTO;
using backend.Models;
using MongoDB.Driver;

namespace backend.Services.implementations
{
    public class SocialService
    {
        private readonly IMongoCollection<SocialModal> _social;

        public SocialService(IConfiguration config)
        {
            var settings = config.GetSection("DatabaseSettings").Get<MongoSettings>();
            var client = new MongoClient(settings.MongoURI);
            var db = client.GetDatabase(settings.DatabaseName);

            _social = db.GetCollection<SocialModal>(settings.SocialCollectionName);
        }

        public SocialModal Create(SocialModal social)
        {
            _social.InsertOne(social);
            return social;
        }

        public bool IsUserConnectedToGitHub(string userId)
        {
            var res = _social.Find(x => x.UserId == userId).FirstOrDefault();
            return res != null;
        }

        public GetOwnerAndAccessTokenDTO GetOwnerAndAccessToken(string userId)
        {
            var res = _social.Find(x => x.UserId == userId).FirstOrDefault(); // Also need  to do Provider == "github" but that will need github as enum or that is plan so it is right now on hold. - assuming no other provider available.
            return new GetOwnerAndAccessTokenDTO { AccessToken = res.AccessToken, GithubUsername = res.GithubUsername };
        }
    }
}
