using backend.Models;

namespace backend.DTO
{
    public class Auth
    {
        public class UserSearchResult
        {
            public string UserId { get; set; }
            public string Username { get; set; }
            public NameDto Name { get; set; }
            public string Email { get; set; }
        }
    }
}
