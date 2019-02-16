using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MyToolsYourToolsBackend.Application.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyToolsYourToolsBackend.API.Controllers
{
    [Route("api")]
    [ApiController]
    [EnableCors("MyToolsYourTools")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IOfferService _offerService;

        public UsersController(IUserService userService, IOfferService offerService)
        {
            _userService = userService;
            _offerService = offerService;
        }

        [HttpGet("Users")]
        public IActionResult GetUsers()
        {
            return Ok(_userService.GetUsers());
        }
        [Route("Users/{userId}")]
        [HttpGet]
        public IActionResult GetUserById(Guid userId)
        {
            return Ok(_userService.GetUserById(userId));

        }

        [HttpGet("{offerId}/Users")]
        public IActionResult GetOfferBorrower(Guid offerId)
        {
            if (!_offerService.CheckIfOfferIsRented(offerId)) {
                return NoContent();
            }
            return Ok(_userService.GetOfferBorrower(offerId));
        }
    }
}
