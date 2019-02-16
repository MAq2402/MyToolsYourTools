using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Services
{
    public interface INotificationService
    {
        bool userHasNotifications(Guid userId);
        IEnumerable<NotificationDto> GetNotificationsForUser(Guid userId);
        NotificationDto AddNotification(NotificationForCreationDto notification);
        bool DeleteNotification(Guid notificationId);
        bool CheckIfUserAlreadySendRentRequest(Guid userId, Guid offerId);
    }
}