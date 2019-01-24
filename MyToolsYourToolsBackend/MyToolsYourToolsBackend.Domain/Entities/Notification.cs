using MyToolsYourToolsBackend.Domain.Entities.Abstract;
using MyToolsYourToolsBackend.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Domain.Entities
{
    public class Notification: Enitity
    {
        public Guid OwnerId { get; set; }
        public User Owner { get; set; }
        public Guid TargetUserId { get; set; }
        public User TargetUser { get; set; }
        public Guid OfferId { get; set; }
        public Offer Offer { get; set; }
        public NotifcationType Type { get; set; }
    }
}
