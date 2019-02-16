using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Application.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyToolsYourToolsBackend.API.Controllers
{
    [Route("api")]
    [ApiController]
    [EnableCors("MyToolsYourTools")]
    public class AuthController : ControllerBase
    {
        private IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterCredentialsDto registerCredentials)
        {
            var user = _authService.Register(registerCredentials);

            return Ok(user);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody]LoginCredentialsDto loginCredentials)
        {
            var user = _authService.Login(loginCredentials);

            if(user == null)
            {
                return BadRequest("Błędny login lub hasło");
            }
            return Ok(user);
        }
 
    }
}
