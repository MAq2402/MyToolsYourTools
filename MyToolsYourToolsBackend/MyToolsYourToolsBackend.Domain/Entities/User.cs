﻿using MyToolsYourToolsBackend.Domain.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Domain.Entities
{
    public class User : Enitity
    {
        public string Email { get; set; }
        public IEnumerable<UserGroup> UserGroups { get; set; } = new List<UserGroup>();
        public IEnumerable<Offer> Offers { get; set; } = new List<Offer>();
        public IEnumerable<Rent> Rents { get; set; } = new List<Rent>();
        public int Points { get; set; }
    }
}
