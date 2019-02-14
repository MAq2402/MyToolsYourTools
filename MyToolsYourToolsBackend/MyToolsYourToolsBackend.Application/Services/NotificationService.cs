using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Domain.DbContexts;
using MyToolsYourToolsBackend.Domain.Entities;
using MyToolsYourToolsBackend.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace MyToolsYourToolsBackend.Application.Services
{
    public class NotificationService : INotificationService
    {
        private AppDbContext _dbContext;

        public NotificationService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool userHasNotifications(Guid userId)
        {
            return _dbContext.Notifications.Any(n => n.OwnerId == userId);
        }

        public IEnumerable<NotificationDto> GetNotificationsForUser(Guid userId)
        {
            var notificationsToReturn = _dbContext.Notifications.Where(n => n.OwnerId == userId).Include(n =>  n.Offer ).Include(n=> n.TargetUser);
            
            return Mapper.Map<IEnumerable<NotificationDto>>(notificationsToReturn);
           
        }

        public NotificationDto AddNotification(NotificationForCreationDto notification)
        {
            var newNotification = Mapper.Map<Notification>(notification);
            _dbContext.Notifications.Add(newNotification);

            // get deposit if rent request
            if (newNotification.Type == NotificationType.RentRequest)
            {
                var pointsRentCost = 100;
                var borrower = _dbContext.Users.FirstOrDefault(u => u.Id == notification.TargetUserId);
                borrower.Points -= pointsRentCost;
            }

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not add notification");
            }

            return Mapper.Map<NotificationDto>(newNotification);

        }

        public bool DeleteNotification(Guid notificationId)
        {  
            var notificationToDelete = _dbContext.Notifications.FirstOrDefault(n => n.Id==notificationId);
            if (notificationToDelete != null)
            {
                _dbContext.Notifications.Remove(notificationToDelete);

                // return deposit if rent request
                if (notificationToDelete.Type == NotificationType.RentRequest)
                {
                    var pointsRentCost = 100;
                    var borrower = _dbContext.Users.FirstOrDefault(u =>
                                                u.Id == notificationToDelete.TargetUserId);
                    borrower.Points += pointsRentCost;
                }

                if (_dbContext.SaveChanges() == 0)
                {
                    throw new Exception("Could not delete");
                }
                return true;
            }
            else
            {
                return false;
            }
        }

        public NotificationDto SendNotificationFromServer(Guid toUserId, Guid fromUserId, Guid offerId, NotificationType type)
        {
            var notificationToSend = new NotificationForCreationDto()
            {
                OwnerId = toUserId,
                TargetUserId = fromUserId,
                OfferId = offerId,
                Type = type
            };

            return AddNotification(notificationToSend);

        }

        public bool CheckIfUserAlreadySendRentRequest(Guid userId, Guid offerId)
        {
            return _dbContext.Notifications.Any(n => n.TargetUserId == userId
                                                && n.OfferId == offerId
                                                && n.Type == NotificationType.RentRequest);
        }
    }
}
