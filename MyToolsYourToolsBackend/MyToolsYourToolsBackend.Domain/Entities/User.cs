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
        public ICollection<UserGroup> UserGroups { get; set; } = new List<UserGroup>();
        public ICollection<Offer> Offers { get; set; } = new List<Offer>();
        public ICollection<Rent> Rents { get; set; } = new List<Rent>();
        public int Points { get; set; }
    }
}
