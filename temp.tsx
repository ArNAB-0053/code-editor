[HttpPost("signin")]
public IActionResult SignIn([FromBody] SignInRequest request)
{
    var user = _service.SignIn(request.Identifier, request.Password);

    if (user == null)
        return Unauthorized(new { message = "Invalid username/email or password" });

    return Ok(new
    {
        message = "Login successful",
        user = new
        {
            id = user.Id,
            name = user.Name,
            email = user.Email
        }
    });
}
  public AuthModel? SignIn(string identifier, string password)
{
    identifier = identifier.ToLower();

    // Find by email OR username
    var filter = Builders<AuthModel>.Filter.Or(
        Builders<AuthModel>.Filter.Eq(x => x.Email.ToLower(), identifier),
        Builders<AuthModel>.Filter.Eq(x => x.Name.ToLower(), identifier)
    );

    var user = _auth.Find(filter).FirstOrDefault();
    if (user == null) return null;

    // Compare raw password
    if (user.Password != password) return null;

    return user;
}
