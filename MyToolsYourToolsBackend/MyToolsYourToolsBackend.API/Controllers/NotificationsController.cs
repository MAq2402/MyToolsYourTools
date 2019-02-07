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
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyToolsYourTools")]
    public class NotificationsController : ControllerBase
    {
        private INotificationService _notificationService;
        private IUserService _userService;

        public NotificationsController(INotificationService notificationService, IUserService userService)
        {
            _notificationService = notificationService;
            _userService = userService;
        }
       

        [HttpGet("{userId}")]
        public IActionResult GetUserNotifications(Guid userId)
        {
            if(_notificationService.userHasNotifications(userId))
            {
            return Ok(_notificationService.GetNotificationsForUser(userId));
            }
            else return NotFound("no notifications");
        }


        
        [HttpPost("add")]
        public IActionResult AddNotification([FromBody]NotificationForCreationDto notificationFromBody)
        {
            
            var offerToReturn = _notificationService.AddNotification(notificationFromBody);

            return Ok(offerToReturn);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteNotification(Guid notificationId){
           if( _notificationService.DeleteNotification(notificationId)) return Ok();
           else return NotFound();
        }
    } 
}