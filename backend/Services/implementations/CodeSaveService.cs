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
                .Set(x => x.UserId, code.UserId);

            _code.UpdateOne(x => x.Id == id, update);
        }
    }
}
