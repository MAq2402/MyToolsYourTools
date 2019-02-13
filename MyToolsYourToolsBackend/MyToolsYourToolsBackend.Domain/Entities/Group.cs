using MyToolsYourToolsBackend.Domain.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Domain.Entities
{
    public class Group : Enitity
    {
        public string Name { get; set; }
        public ICollection<UserGroup> UserGroups { get; set; } = new List<UserGroup>();
        public ICollection<Offer> Offers { get; set; } = new List<Offer>();
    }
}
