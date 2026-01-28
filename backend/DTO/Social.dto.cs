namespace backend.DTO
{
    public class GetOwnerAndAccessTokenDTO
    {
        public string GithubUsername { get; set; }
        public string AccessToken { get; set; };
    }
}
