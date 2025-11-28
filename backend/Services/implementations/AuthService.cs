using backend.config;
using backend.Models;
using MongoDB.Driver;

namespace backend.Services.implementations
{
    public class AuthServices
    {
        private readonly IMongoCollection<AuthModel> _auth;

        public AuthServices(IConfiguration config)
        {
            var settings = config.GetSection("DatabaseSettings").Get<MongoSettings>();
            var client = new MongoClient(settings?.MongoURI);
            var db = client.GetDatabase(settings?.DatabaseName);
            _auth = db.GetCollection<AuthModel>(settings?.AuthCollectionName);
        }

        // Create / Sign Up
        public AuthModel create(AuthModel auth)
        {
            auth.Name = auth.Name.ToLower();
            auth.Email = auth.Email.ToLower();

            _auth.InsertOne(auth);
            return auth;
        }

        // Get all users
        public List<AuthModel> GetAllUsers() => _auth.Find(x => true).ToList();

        // Sign In
        public AuthModel? SignIn(string identifier, string password)
        {
            identifier = identifier.ToLower();

            //  new MongoDB.Bson.BsonRegularExpression($"^{identifier}$", "i") -> Just for lower case as MongoDB doesn't support ToLower() and that is also for Name and Email, for them to be small cases not Identifier
            //  Not Possible, needed to Regex
            //  var filter = Builders<AuthModel>.Filter.Or(
            //    Builders<AuthModel>.Filter.Eq(x => x.Email.ToLower(), identifier),
            //    Builders<AuthModel>.Filter.Eq(x => x.Name.ToLower(), identifier)
            //  );

            var filter = Builders<AuthModel>.Filter.Or(
                    Builders<AuthModel>.Filter.Regex(x => x.Email, new MongoDB.Bson.BsonRegularExpression($"^{identifier}$", "i")),
                    Builders<AuthModel>.Filter.Regex(x => x.Name, new MongoDB.Bson.BsonRegularExpression($"^{identifier}$", "i"))
                );

            var user = _auth.Find(filter).FirstOrDefault();
            if (user == null || user.Password != password) return null;
            return user;
        }
    }
}