using MyToolsYourToolsBackend.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Dtos
{
    public class NotificationDto
    {
        public Guid Id {get; set;}
        public Guid OwnerId { get; set; }
        public Guid TargetUserId { get; set; }
        public String TargetNotificationUserName{get; set;}
        public Guid OfferId { get; set; }
        public String OfferName {get; set;}
        public NotificationType Type {get;set;}
    }
}