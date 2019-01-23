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
        public IEnumerable<UserGroup> UserGroups { get; set; } = new List<UserGroup>();
        public IEnumerable<Offer> Offers { get; set; } = new List<Offer>();
        public IEnumerable<Rent> Rents { get; set; } = new List<Rent>();
        public IEnumerable<Notification> TargetedNotifications { get; set; } = new List<Notification>();
        public IEnumerable<Notification> SentNotifications { get; set; } = new List<Notification>();
        public IEnumerable<Opinion> GivenOpinions { get; set; }
        public IEnumerable<Opinion> ReceivedOpinions { get; set; }
        public int Points { get; set; }
    }
}
