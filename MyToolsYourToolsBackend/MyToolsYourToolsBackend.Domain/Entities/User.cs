using MyToolsYourToolsBackend.Domain.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Domain.Entities
{
    public class User : Enitity
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int Points { get; set; }
        public ICollection<UserGroup> UserGroups { get;private set; } = new List<UserGroup>();
        public ICollection<Offer> Offers { get;private set; } = new List<Offer>();
        public ICollection<Rent> Rents { get;private set; } = new List<Rent>();
        public ICollection<Notification> TargetedNotifications { get;private set; } = new List<Notification>();
        public ICollection<Notification> SentNotifications { get;private set; } = new List<Notification>();
        public ICollection<Opinion> GivenOpinions { get; private set; } = new List<Opinion>();
        public ICollection<Opinion> ReceivedOpinions { get; private set; } = new List<Opinion>();
    }
}
