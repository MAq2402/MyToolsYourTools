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
    public class RentsController : ControllerBase
    {
        private IRentService _rentService;
        private IUserService _userService;
        private IOfferService _offerService;

        public RentsController(IRentService rentService, IUserService userService, IOfferService offerService)
        {
            _rentService = rentService;
            _userService = userService;
            _offerService = offerService;
        }

        [HttpPost("rents")]
        public IActionResult AddRent([FromBody]RentForCreationDto rentFromBody)
        {
            if (!_userService.CheckIfUserExists(rentFromBody.BorrowerId)
                || !_offerService.CheckIfOfferExists(rentFromBody.OfferId))
            {
                return NotFound();
            }

            int pointsRentCost = 100;

            _rentService.AddRent(rentFromBody, pointsRentCost);

            return NoContent();
        }

        [HttpDelete("rents/{offerId}")]
        public IActionResult DeleteRent(Guid offerId)
        {
            if(!_offerService.CheckIfOfferExists(offerId))
            {
                return NotFound();
            }

            int pointsReturnReward = 100;

            _rentService.DeleteRent(offerId, pointsReturnReward);

            return NoContent();
        }
    }
}
