using System.Text.RegularExpressions;
using System.Threading.Tasks;
using backend.config;
using backend.DTO;
using backend.Models;
using BCrypt.Net;
using MongoDB.Driver;
using static backend.DTO.Auth;

namespace backend.Services.implementations
{
    public class AuthServices
    {
        private readonly IMongoCollection<AuthModel> _auth;
        private readonly RedisService _redis;

        // -------------------------------
        //             CONSTRUCTOR
        // -------------------------------
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

        // -------------------------------
        //             CRUD
        // -------------------------------

        // Create / Sign Up
        public async Task<AuthModel> Create(AuthModel auth, string confirmPassword)
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

            Console.WriteLine(auth.Password, confirmPassword);

            if (!IsValidPassword(auth.Password)) throw new Exception("Invalid Password Format");
            if (!IsValidPassword(confirmPassword)) throw new Exception("Invalid Confirm Password Format");

            // This ???
            //if (auth.Password != confirmPassword)
            //{
            //    throw new Exception("Password didn't match"); 
            //}

            auth.Password = BCrypt.Net.BCrypt.HashPassword(auth.Password);

            // Or this ??? - which one better ????
            if (!BCrypt.Net.BCrypt.Verify(confirmPassword, auth.Password))
            {
                throw new Exception("Password didn't match");
            }

            _auth.InsertOne(auth);

            await _redis.SetString($"user:username:{auth.Username}", auth.Id);
            await _redis.SetString($"user:email:{auth.Email}", auth.Id);

            return auth;
        }

        // Create With Provider
        public async Task<AuthModel> FindOrCreateOAuthUser(
            string email,
            ProviderEnum provider,
            string providerId,
            NameDto name,
            string username
        ){
            if (string.IsNullOrWhiteSpace(providerId))
                throw new Exception("Invalid OAuth provider id");

            email = email.ToLower();
            username = username.ToLower();

            var user = _auth.Find(x =>
               x.Provider == provider &&
               x.ProviderId == providerId
           ).FirstOrDefault();

            if (user != null)
                    {
                        if (user.Provider != provider)
                            throw new Exception("Account exists with a different login method");

                        return user;
                    }

            if (!string.IsNullOrEmpty(email))
            {
                var emailUser = _auth.Find(x => x.Email == email).FirstOrDefault();
                if (emailUser != null && emailUser.Provider != provider)
                    throw new Exception("Account exists with a different login method");
            }

            var generatedUsername = await GenerateUniqueUsername(
                username,
                name?.FirstName,
                name?.LastName
            );

            var newUser = new AuthModel
                            {
                                Email = email,
                                Provider = provider,
                                ProviderId = providerId,
                                Name = name,
                                Username = generatedUsername,
                                Password = null
                            };

             _auth.InsertOne(newUser);


            await _redis.SetString($"user:username:{username}", newUser.Id);
            if (!string.IsNullOrEmpty(email))
                await _redis.SetString($"user:email:{email}", newUser.Id);

            return newUser;
        }


        // Get all users
        public List<AuthModel> GetAllUsers() => _auth.Find(x => true).ToList();

        // Details - Get by userId
        public AuthModel GetUserById(string id) => _auth.Find(x => x.Id == id).FirstOrDefault();

        // Details - Get by username
        public AuthModel GetUserByUsername(string username) => _auth.Find(x => x.Username == username).FirstOrDefault();

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

            if (user.Provider != ProviderEnum.NORMAL)
            {
                throw new Exception($"Please sign in using {user.Provider}");
            }

            if (string.IsNullOrEmpty(user.Password)) return null;
            if (!BCrypt.Net.BCrypt.Verify(password, user.Password)) return null;

            return user;
        }

        // Change Password
        public bool ChangePassword(string id, string username, string oldPassword, string newPassword, string confirmNewPassword)
        {
            var user = _auth.Find(x => x.Id == id && x.Username == username).FirstOrDefault();
            if (user == null) throw new Exception("User not found");

            if (user.Provider != ProviderEnum.NORMAL) throw new Exception("Please use your provider");

            if (!IsValidPassword(newPassword)) throw new Exception("Invalid Password Format");
            if (!IsValidPassword(confirmNewPassword)) throw new Exception("Invalid Password Format");

            if (!BCrypt.Net.BCrypt.Verify(oldPassword, user.Password)) throw new Exception("Old and New Password didn't match");

            newPassword = BCrypt.Net.BCrypt.HashPassword(newPassword);

            if (!BCrypt.Net.BCrypt.Verify(confirmNewPassword, newPassword)) throw new Exception("Password didn't match");

            var filter = Builders<AuthModel>.Update
                .Set(x => x.Password, newPassword)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);

            var res = _auth.UpdateOne(x => x.Id == id && x.Username == username, filter);
            return res.ModifiedCount > 0;
        }

        // -------------------------------
        //       AVAILABILITY CHECK
        // -------------------------------

        // Checking Username already exists or not

        // retruns a VOID
        public async Task CheckUsernameExists(string username)
        {
       
            username = username.ToLower();

            if (!IsValidUsername(username)) throw new Exception("Invalid Username Format");            

            if (await _redis.Exists($"user:username:{username}")) throw new Exception("Username already in use");
            // FALLBACK: MONGO checks for email/username exists or not
            // Will be used when redis return fals - either for NEW USER or REDIS FAILS

            if (_auth.Find(x => x.Username == username).Any())
                throw new Exception("Username already in use");
        }

        // return BOOLEAN
        public async Task<bool> IsUsernameAvailable(string username)
        {
            username = username.ToLower();

            if (!IsValidUsername(username)) return false;

            if (await _redis.Exists($"user:username:{username}")) return false;

            if (_auth.Find(x => x.Username == username).Any())
                return false;

            return true;
        }


        // Checking Email already exists or not
        public async Task CheckEmailExists(string email)
        {
            email = email.ToLower();

            if (!IsValidEmail(email)) throw new Exception("Invalid Email Format");

            if (await _redis.Exists($"user:email:{email}")) throw new Exception("Email already in use");

            // FALLBACK: MONGO checks for email/username exists or not
            // Will be used when redis return fals - either for NEW USER or REDIS FAILS
            if (_auth.Find(x => x.Email == email).Any())
                throw new Exception("Email already in use");
        }


        // -------------------------------
        //             SEARCH
        // -------------------------------

        public async Task<List<UserSearchResult>> SearchByUsernameAsync(string prefix)
        {
            if(string.IsNullOrWhiteSpace(prefix)) return new List<UserSearchResult>();

            prefix = prefix.ToLower().Trim();

            string cacheKey = $"search:usernames:{prefix}";
            var cached = await _redis.GetString(cacheKey);

            if (!string.IsNullOrEmpty(cached))
            {
                return System.Text.Json.JsonSerializer
                        .Deserialize<List<UserSearchResult>>(cached)
                        ?? new List<UserSearchResult>();
            }

            var filter = Builders<AuthModel>.Filter.Regex(
                x => x.Username,
                new MongoDB.Bson.BsonRegularExpression($"^{prefix}", "i")
            );

            var users = await _auth.Find(filter)
                                   .Limit(10)
                                   .Project(x => new UserSearchResult
                                   {
                                       Username = x.Username,
                                       Email = x.Email,
                                       Name = x.Name,
                                       UserId = x.Id!,
                                   })
                                   .ToListAsync();

            var json = System.Text.Json.JsonSerializer.Serialize(users);
            await _redis.SetString(cacheKey, json, expirySeconds: 20);

            return users;
        }

        // -------------------------------
        //        VALIDATION CHECK
        // -------------------------------

        // Email Regex
        public bool IsValidEmail(string email)
        {
            if (String.IsNullOrEmpty(email)) return false;

            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        // Username Regex
        public bool IsValidUsername(string username)
        {
            if (String.IsNullOrEmpty(username)) return false;

            try
            {
                var regex = new Regex("^[a-z][a-z0-9_-]{2,17}$");
                return regex.IsMatch(username);
            } 
            catch
            {
                return false;
            }
        }

        // Password Regex
        public bool IsValidPassword(string password)
        {
            if (String.IsNullOrEmpty(password)) return false;

            try
            {
                var regex = new Regex(@"^(?!.*(.)\1{3,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:'"",.<>\?\/\\]).{8,}$");
                return regex.IsMatch(password);
            }
            catch
            {
                return false;
            }
        }

        // Generate Username
        private async Task<string> GenerateUniqueUsername(
            string githubUsername,
            string firstName,
            string lastName
        )
        {
            if (!string.IsNullOrWhiteSpace(githubUsername))
            {
                var baseName = githubUsername.ToLower();

                if (IsValidUsername(baseName) && await IsUsernameAvailable(baseName))
                    return baseName;

                for (int i = 1; i <= 999; i++)
                {
                    var attempt = $"{baseName}{i}";
                    if (IsValidUsername(attempt) && await IsUsernameAvailable(attempt))
                        return attempt;
                }
            }

            var nameBase = $"{firstName}{lastName}".ToLower();
            if (IsValidUsername(nameBase) && await IsUsernameAvailable(nameBase))
                return nameBase;

            for (int i = 1; i <= 999; i++)
            {
                var attempt = $"{nameBase}{i}";
                if (IsValidUsername(attempt) && await IsUsernameAvailable(attempt))
                    return attempt;
            }

            throw new Exception("Unable to generate unique username");
        }

    }
}