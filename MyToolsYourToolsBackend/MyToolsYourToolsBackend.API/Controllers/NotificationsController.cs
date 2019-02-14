using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Application.Services;
using MyToolsYourToolsBackend.Domain.Enums;

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
        private IOfferService _offerService;
        private IRentService _rentService;

        public NotificationsController(INotificationService notificationService, IUserService userService, IOfferService offerService, IRentService rentService)
        {
            _notificationService = notificationService;
            _userService = userService;
            _offerService = offerService;
            _rentService = rentService;
        }
       

        [HttpGet("{userId}")]
        public IActionResult GetUserNotifications(Guid userId)
        {
            if (!_userService.CheckIfUserExists(userId))
            {
                return NotFound();
            }

            return Ok(_notificationService.GetNotificationsForUser(userId));
           
        }
        
        [HttpPost()]
        public IActionResult AddNotification([FromBody]NotificationForCreationDto notificationFromBody)
        {
            if(!_userService.CheckIfUserExists(notificationFromBody.TargetUserId)
                || !_offerService.CheckIfOfferExists(notificationFromBody.OfferId))
            {
                return NotFound();
            }

            if(notificationFromBody.Type == NotificationType.RentRequest)
            {
                if (!_offerService.CheckIfOfferIsActive(notificationFromBody.OfferId))
                {
                    return BadRequest("Oferta nieaktywna.");
                }
                else if (_notificationService.CheckIfUserAlreadySendRentRequest(
                    notificationFromBody.TargetUserId, notificationFromBody.OfferId))
                {
                    return BadRequest("Proœba o wypo¿yczenie dla tej oferty ju¿ zosta³a przes³ana.");
                }
                else if (!_rentService.CheckIfUserHasEnoughPoints(notificationFromBody.TargetUserId))
                {
                    return BadRequest("Niewystarczaj¹ca iloœæ punktów na zrealizowanie wypo¿yczenia.");
                }
            }
            
            var offerToReturn = _notificationService.AddNotification(notificationFromBody);

            return Ok(offerToReturn);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteNotification(Guid id){

            if (_notificationService.DeleteNotification(id))
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("{userId}/{offerId}/check-if-can-send-rent-request")]
        public IActionResult UserCanSendRentRequest(Guid userId, Guid offerId)
        {
            if(!_userService.CheckIfUserExists(userId)
                || !_offerService.CheckIfOfferExists(offerId))
            {
                return NotFound();
            }

            return Ok(!_notificationService.CheckIfUserAlreadySendRentRequest(userId, offerId));

        }
    } 
}
