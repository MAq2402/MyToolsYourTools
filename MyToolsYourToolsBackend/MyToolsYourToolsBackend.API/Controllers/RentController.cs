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

        public RentsController(IRentService rentService, IUserService userService)
        {
            _rentService = rentService;
            _userService = userService;
        }

        [HttpPost("rents")]
        public IActionResult AddRent([FromBody]RentForCreationDto rentFromBody)
        {
            if (!_userService.CheckIfUserExists(rentFromBody.BorrowerId))
            {
                return NotFound();
            }

            int pointsRentCost = 100;

            if(!_rentService.CheckIfUserHasEnoughPoints(rentFromBody.BorrowerId, pointsRentCost))
            {
                return BadRequest("Niewystarczająca ilość punktów na zrealizowanie wypożyczenia.");
            }

            _rentService.AddRent(rentFromBody, pointsRentCost);

            return NoContent();
        }

        [HttpDelete("rents/{offerId}")]
        public IActionResult DeleteRent(Guid offerId)
        {
            int pointsReturnReward = 100;
            _rentService.DeleteRent(offerId, pointsReturnReward);
            return NoContent();
        }
    }
}
