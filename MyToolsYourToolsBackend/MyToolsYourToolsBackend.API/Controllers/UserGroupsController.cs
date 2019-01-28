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
    public class UserGroupsController : ControllerBase
    {
        private IUserGroupService _userGroupService;

        //TODO: Dodać userService groupService i dodawanie/usuwanie w ich kolekcjach

        public UserGroupsController(IUserGroupService userGroupService)
        {
            _userGroupService = userGroupService;
        }

        [HttpPost("user-groups")]
        public IActionResult JoinGroup([FromBody]UserGroupDto userGroupFromBody)
        {
            var userGroupToReturn = _userGroupService.JoinGroup(userGroupFromBody);

            return Created(nameof(JoinGroup), userGroupToReturn);
        }

        [HttpDelete("user-groups")]
        public IActionResult LeaveGroup(UserGroupDto userGroup)
        {
            var result = _userGroupService.LeaveGroup(userGroup);

            if(result == true)
            {
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
