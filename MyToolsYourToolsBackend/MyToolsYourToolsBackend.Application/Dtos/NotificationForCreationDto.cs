using MyToolsYourToolsBackend.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Dtos
{
    public class NotificationForCreationDto
    {
       
        public Guid OwnerId { get; set; }
        public Guid TargetUserId { get; set; }
        public Guid OfferId { get; set; }
        public NotificationType Type {get;set;}
    }
}