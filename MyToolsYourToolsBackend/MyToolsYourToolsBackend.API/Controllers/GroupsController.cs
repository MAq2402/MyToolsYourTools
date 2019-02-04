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
    public class GroupsController : ControllerBase
    {
        private IGroupService _groupService;

        public GroupsController(IGroupService groupService, IUserService userService)
        {
            _groupService = groupService;
        }
       [HttpGet("groups")]
       public IActionResult GetGroups()
       {
            return Ok(_groupService.GetAllGroups());
       }

        [HttpGet("{userId}/groups")]
        public IActionResult GetUserGroups(Guid userId)
        {
            return Ok(_groupService.GetUserGroups(userId));
        }

        [HttpPost("groups")]
        public IActionResult AddGroup([FromBody]GroupForCreationDto groupFromBody)
        {
            if (_groupService.checkIfNameIsUnique(groupFromBody))
            {
                return BadRequest("Grupa o podanej nazwie już istnieje. Podaj inną nazwę.");
            }

            var groupToReturn = _groupService.AddGroup(groupFromBody);
            return Created(nameof(GetGroups), groupToReturn);
        }
    }
}
