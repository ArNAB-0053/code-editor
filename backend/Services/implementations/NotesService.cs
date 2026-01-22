using backend.config;
using backend.Models;
using MongoDB.Driver;

namespace backend.Services.implementations
{
    public class NotesService
    {
        private readonly IMongoCollection<NotesModal> _notes;

        public NotesService(IConfiguration config)
        {
            var settings = config.GetSection("DatabaseSettings").Get<MongoSettings>();
            var client = new MongoClient(settings?.MongoURI);
            var db = client.GetDatabase(settings?.DatabaseName);
            _notes = db.GetCollection<NotesModal>(settings?.NotesCollectionName);

            _notes.Indexes.CreateOne(
                new CreateIndexModel<NotesModal>(
                    Builders<NotesModal>.IndexKeys.Ascending(x => x.CodeId),
                    new CreateIndexOptions { Unique = true }
                )
            );

        }

        // Create or Update 
        public async Task<NotesModal> UpsertAsync(NotesModal note)
        {
            var filter = Builders<NotesModal>.Filter
                .Eq(x => x.CodeId, note.CodeId);

            var update = Builders<NotesModal>.Update
                .Set(x => x.Content, note.Content)
                .Set(x => x.Title, note.Title)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);

            await _notes.UpdateOneAsync(
                filter,
                update,
                new UpdateOptions { IsUpsert = true }
            );

            return note;
        }

        // GET Notr by CodeId - (Details)
        public NotesModal GetNote(string codeId) => _notes.Find(x => x.CodeId == codeId).FirstOrDefault();

        // Rename Note by CodeId
        public void RenameNote(string codeId, string title)
        {
            var filter = Builders<NotesModal>.Update
                .Set(x => x.Title, title)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);

            _notes.UpdateOne(x => x.CodeId == codeId, filter);
        }
    }
}
