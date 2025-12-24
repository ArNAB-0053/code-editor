
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Models;
using Microsoft.IdentityModel.Tokens;

namespace backend.helper
{
    public static class JwtHelper
    {
        public static string GenerateToken(AuthModel user, IConfiguration config)
        {
            var jwtSettings = config.GetSection("JwtSettings");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);            

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id!),
                new Claim(ClaimTypes.NameIdentifier, user.Id!),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.Email, user.Email),

                new Claim("name", $"{user.Name.FirstName} {user.Name.MiddleName} {user.Name.LastName}".Trim()),
                new Claim("firstname", user.Name.FirstName),
                new Claim("middlename", user.Name.MiddleName ?? ""),
                new Claim("lastname", user.Name.LastName),

                new Claim("username", user.Username)
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(int.Parse(jwtSettings["ExpiryMinutes"]!)),
                signingCredentials: creds
            );

            Console.WriteLine(token.ToString());

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
