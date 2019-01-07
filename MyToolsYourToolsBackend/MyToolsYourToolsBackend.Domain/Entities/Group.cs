using MyToolsYourToolsBackend.Domain.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Domain.Entities
{
    public class Group : Enitity
    {
        public string Name { get; set; }
        public IEnumerable<UserGroup> UserGroups { get; set; }
    }
}
