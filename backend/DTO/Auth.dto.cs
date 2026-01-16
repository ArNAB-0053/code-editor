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

    public class RegisterRequest
    {
        public NameDto Name { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class ProviderRequest
    {
        public NameDto Name { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public ProviderEnum Provider { get; set; }
        public string ProviderId { get; set; }
    }
}
