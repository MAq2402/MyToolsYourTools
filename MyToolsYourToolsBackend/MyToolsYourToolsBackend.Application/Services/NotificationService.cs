using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Domain.DbContexts;
using MyToolsYourToolsBackend.Domain.Entities;
using MyToolsYourToolsBackend.Domain.Enums;

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
            return _dbContext.Notifications.Any(n => n.TargetUserId == userId);
        }
        public IEnumerable<NotificationDto> GetNotificationsForUser(Guid userId)
        {
            var userNotificationIds = _dbContext.Notifications.Where(n => n.TargetUserId == userId).Select(n => n.Id);
            var notificationsToReturn = _dbContext.Notifications.Where(n => userNotificationIds.Contains(n.Id));
            
            return Mapper.Map<IEnumerable<NotificationDto>>(notificationsToReturn);
           
        }

        public NotificationDto AddNotification(NotificationForCreationDto notification)
        {
            var newNotification = Mapper.Map<Notification>(notification);
            _dbContext.Notifications.Add(newNotification);
            if(_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not add otification");
            }

            return Mapper.Map<NotificationDto>(newNotification);


        }

        public bool DeleteNotification(Guid notificationId)
        {
            
            var notificationToDelete = _dbContext.Notifications.FirstOrDefault(n => n.Id==notificationId);
            if(notificationToDelete!=null)
            {
            _dbContext.Notifications.Remove(notificationToDelete);
            
            if(_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not delete");
               
            }
            return true;
            }
            else return false;
        }
    }
}
