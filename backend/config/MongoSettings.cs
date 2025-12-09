namespace backend.config
{
    public class MongoSettings
    {
        public string MongoURI { get; set; }
        public string DatabaseName { get; set; }
        public string AuthCollectionName { get; set; }
        public string CodeSaveCollectionName { get; set; }
        public string ShareCollectionName { get; set; }
    }
}
