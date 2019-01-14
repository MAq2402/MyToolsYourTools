using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Application.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyToolsYourToolsBackend.API.Controllers
{
    [Route("api")]
    public class AuthController : Controller
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
 
    }
}
