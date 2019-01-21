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
    [Route("api/{userId}/offers")]
    [ApiController]
    public class OffersController : ControllerBase
    {
        private IOfferService _offerService;

        public OffersController(IOfferService offerService)
        {
            _offerService = offerService;
        }
       [HttpGet]
       public IActionResult GetOffers(Guid userId)
       {
            return Ok(_offerService.GetOffers(userId));
       }

       // [HttpGet]
       // public IActionResult
       //[HttpPost()]
       //public IActionResult AddOffer([FromBody]OfferForCreationDto offerFromBody,Guid userId)
       //{
       //     var userToReturn = _offerService.AddOffer(offerFromBody);

       //     return CreatedAtRoute()
       //}
    }
}
