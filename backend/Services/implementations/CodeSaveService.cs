using backend.config;
using backend.Models;
using MongoDB.Driver;

namespace backend.Services.implementations
{
    public class CodeSaveService
    {
        private readonly IMongoCollection<CodeSaveModel> _code;

        public CodeSaveService(IConfiguration config)
        {
            var settings = config.GetSection("DatabaseSettings").Get<MongoSettings>();
            var client = new MongoClient(settings?.MongoURI);
            var db = client.GetDatabase(settings?.DatabaseName);
            _code = db.GetCollection<CodeSaveModel>(settings?.CodeSaveCollectionName);
        }


        public CodeSaveModel Create(CodeSaveModel savecode)
        {
            _code.InsertOne(savecode);
            return savecode;
        }

        public CodeSaveModel GetCode(string userid, string lang) => _code.Find(x => x.UserId == userid && x.Lang == lang).FirstOrDefault();

        public void Update(string id, CodeSaveModel code)
        {
            var update = Builders<CodeSaveModel>.Update
                .Set(x => x.Code, code.Code)
                .Set(x => x.Output, code.Output)
                .Set(x => x.Lang, code.Lang)
                .Set(x => x.UserId, code.UserId)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);

            _code.UpdateOne(x => x.Id == id, update);
        }

        public void UpdateOutput(string id, string output)
        {
            var update = Builders<CodeSaveModel>.Update
                .Set(x => x.Output, output)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);

            _code.UpdateOne(x => x.Id == id, update);
        }

        public CodeSaveModel AutoSave(string userid, string lang, string code)
        {
            var existCode = GetCode(userid, lang);

            if (existCode == null)
            {
                var newCode = new CodeSaveModel{
                    Code = code,
                    UserId = userid,
                    Lang = lang,
                    UpdatedAt = DateTime.UtcNow
                };

                _code.InsertOne(newCode);
                return newCode;
            }

            var update = Builders<CodeSaveModel>.Update
                .Set(x => x.Code, code)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);

            _code.UpdateOne(x => x.Id == existCode.Id, update);

            return GetCode(userid, lang);
        }
    }
}
