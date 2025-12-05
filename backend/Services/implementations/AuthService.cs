using backend.config;
using backend.Models;
using MongoDB.Driver;
using BCrypt.Net;
using System.Threading.Tasks;

namespace backend.Services.implementations
{
    public class AuthServices
    {
        private readonly IMongoCollection<AuthModel> _auth;
        private readonly RedisService _redis;
        public AuthServices(IConfiguration config, RedisService redis)
        {
            _redis = redis;
            var settings = config.GetSection("DatabaseSettings").Get<MongoSettings>();
            var client = new MongoClient(settings?.MongoURI);
            var db = client.GetDatabase(settings?.DatabaseName);

            _auth = db.GetCollection<AuthModel>(settings?.AuthCollectionName);

            // CREATING INDEXES
            // Email Index
            var emailIndex = new CreateIndexModel<AuthModel>(
                                    Builders<AuthModel>.IndexKeys.Ascending(x => x.Email),
                                    new CreateIndexOptions { Unique = true}
                                );
            _auth.Indexes.CreateOne(emailIndex);

            // Username Index
            var usernameIndex = new CreateIndexModel<AuthModel>(Builders<AuthModel>.IndexKeys.Ascending(x => x.Username), new CreateIndexOptions { Unique = true });
            _auth.Indexes.CreateOne(usernameIndex);
        }

        // Create / Sign Up
        public async Task<AuthModel> Create(AuthModel auth)
        {
            //// REDIS checks for email/username exists or not
            //if (await _redis.Exists($"user:username:{auth.Username}")) throw new Exception("Username already in use");
            //if (await _redis.Exists($"user:email:{auth.Email}")) throw new Exception("Email already in use");

            //// FALLBACK: MONGO checks for email/username exists or not
            //// Will be used when redis return fals - either for NEW USER or REDIS FAILS
            //if (_auth.Find(x => x.Email == auth.Email).Any())
            //    throw new Exception("Email already in use");

            //if (_auth.Find(x => x.Username == auth.Username).Any())
            //    throw new Exception("Username already in use");

            await CheckUsernameExists(auth.Username);
            await CheckEmailExists(auth.Email);

            auth.Password = BCrypt.Net.BCrypt.HashPassword(auth.Password);

            _auth.InsertOne(auth);

            await _redis.SetString($"user:username:{auth.Username}", auth.Id);
            await _redis.SetString($"user:email:{auth.Email}", auth.Id);

            return auth;
        }

        // Get all users
        public List<AuthModel> GetAllUsers() => _auth.Find(x => true).ToList();

        public AuthModel GetUserById(string id) => _auth.Find(x => x.Id == id).FirstOrDefault();



        // Sign In
        public AuthModel? SignIn(string identifier, string password)
        {
            identifier = identifier.ToLower();

            var filter = Builders<AuthModel>.Filter.Or(
                    Builders<AuthModel>.Filter.Regex(x => x.Email, new MongoDB.Bson.BsonRegularExpression($"^{identifier}$", "i")),
                    Builders<AuthModel>.Filter.Regex(x => x.Username, new MongoDB.Bson.BsonRegularExpression($"^{identifier}$", "i"))
                );

            var user = _auth.Find(filter).FirstOrDefault();

            if (user == null) return null;
            if (!BCrypt.Net.BCrypt.Verify(password, user.Password)) return null;

            return user;
        }

        public async Task CheckUsernameExists(string username)
        {
       
            username = username.ToLower();
            if (await _redis.Exists($"user:username:{username}")) throw new Exception("Username already in use");
            // FALLBACK: MONGO checks for email/username exists or not
            // Will be used when redis return fals - either for NEW USER or REDIS FAILS

            if (_auth.Find(x => x.Username == username).Any())
                throw new Exception("Username already in use");
        }

        public async Task CheckEmailExists(string email)
        {
            email = email.ToLower();
            if (await _redis.Exists($"user:email:{email}")) throw new Exception("Email already in use");

            // FALLBACK: MONGO checks for email/username exists or not
            // Will be used when redis return fals - either for NEW USER or REDIS FAILS
            if (_auth.Find(x => x.Email == email).Any())
                throw new Exception("Email already in use");
        }
    }
}