﻿using System;
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
    [ApiController]
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
       public IActionResult GetOffers()
       {
            return Ok(_offerService.GetAllOffers());
       }

        [HttpGet("{userId}/offers")]
        public IActionResult GetUserOffers(Guid userId)
        {
            return Ok(_offerService.GetUserOffers(userId));
        }

        [HttpGet("offers/{id}",Name = nameof(GetOffer))]
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
    }
}
