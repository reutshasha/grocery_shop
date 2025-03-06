using BL.DTOs;
using BL.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace GroceryShopApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthManager _authManager;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthManager authManager, ILogger<AuthController> logger)
        {
            _authManager = authManager;
            _logger = logger;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginDto)
        {
            return _authManager.Authenticate(loginDto.Username, loginDto.Password) is string token
                ? Ok(new { Token = token })
                : Unauthorized(new { Error = "Invalid username or password." });
        }

    }

}


