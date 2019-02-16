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
    public class OffersController : ControllerBase
    {
        private IOfferService _offerService;
        private IUserService _userService;

        public OffersController(IOfferService offerService, IUserService userService)
        {
            _offerService = offerService;
            _userService = userService;
        }
        [HttpGet("offers")]
        public IActionResult GetOffers(bool onlyActive = false)
        {
            return Ok(_offerService.GetAllOffers(onlyActive));
        }

        [HttpGet("{userId}/offers-for-user-groups")]
        public IActionResult GetOffersForUserGroups(Guid userId)
        {
            return Ok(_offerService.GetOffersForUserGroups(userId));
        }


        [HttpGet("{userId}/offers")]
        public IActionResult GetUserOffers(Guid userId)
        {
            return Ok(_offerService.GetUserOffers(userId));
        }

        [HttpGet("{userId}/offers-borrowed-by-user")]
        public IActionResult GetBorrowedByUserOffers(Guid userId)
        {
            return Ok(_offerService.GetBorrowedByUserOffers(userId));
        }

        [HttpGet("offers/{id}", Name = nameof(GetOffer))]
        public IActionResult GetOffer(Guid id)
        {
            return Ok(_offerService.GetOffer(id));
        }
        [HttpPost("{userId}/offers")]
        public IActionResult AddOffer([FromBody]OfferForCreationDto offerFromBody, Guid userId)
        {
            if (!_userService.CheckIfUserExists(userId))
            {
                return NotFound();
            }
            var offerToReturn = _offerService.AddOffer(offerFromBody, userId);

            return CreatedAtRoute(nameof(GetOffer), new { id = offerToReturn.Id }, offerToReturn);
        }

        [HttpPut("offers/{id}/activate")]
        public IActionResult ActivateOffer(Guid id)
        {
            if (!_offerService.CheckIfOfferExists(id))
            {
                return NotFound();
            }
            var offer = _offerService.ActivateOffer(id);
            return Ok(offer);
        }

        [HttpPut("offers/{id}/hide")]
        public IActionResult HideOffer(Guid id)
        {
            if (!_offerService.CheckIfOfferExists(id))
            {
                return NotFound();
            }
            var offer = _offerService.HideOffer(id);
            return Ok(offer);
        }

        [HttpDelete("offers/{id}")]
        public IActionResult DeleteOffer(Guid id)
        {
            if (!_offerService.CheckIfOfferExists(id))
            {
                return NotFound();
            }
            _offerService.DeleteOffer(id);

            return NoContent();
        }
    }
}
