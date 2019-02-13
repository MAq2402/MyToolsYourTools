using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using MyToolsYourToolsBackend.Application.Services;
using MyToolsYourToolsBackend.Application.Dtos;

namespace MyToolsYourToolsBackend.API.Controllers
{
    [Route("api")]
    [ApiController]
    [EnableCors("MyToolsYourTools")]
    public class OpinionsController : ControllerBase
    {

        private IOpinionService _opinionService;
        private IUserService _userService;

        public OpinionsController(IOpinionService opinionService, IUserService userService)
        {
            _opinionService = opinionService;
            _userService = userService;
        }

        [HttpGet("opinions")]
        public IActionResult GetOpinions()
        {
            return Ok(_opinionService.GetAllOpinions());
        }

        [HttpPost("{ratedUserId}/{ratingUserId}/opinions")]
        public IActionResult AddOpinion([FromBody]OpinionForCreationDto opinionFromBody, Guid ratedUserId, Guid ratingUserId)
        {
            if (!_userService.CheckIfUserExists(ratedUserId))
            {
                return NotFound();
            }

            var opinionToReturn = _opinionService.AddOpinion(opinionFromBody, ratedUserId, ratingUserId);

            return Created(nameof(GetOpinions), opinionToReturn);
        }

        [HttpGet("{userId}/opinions")]
        public IActionResult GetUserReceivedOpinions(Guid userId)
        {
            if (!_userService.CheckIfUserExists(userId))
            {
                return NotFound();
            }
            return Ok(_opinionService.GetUserReceivedOpinions(userId));
        }
    }
}