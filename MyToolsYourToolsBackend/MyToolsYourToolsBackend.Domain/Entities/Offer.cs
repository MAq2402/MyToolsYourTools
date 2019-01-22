using MyToolsYourToolsBackend.Domain.Entities.Abstract;
using MyToolsYourToolsBackend.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Domain.Entities
{
    public class Offer: Enitity
    {
        public Guid OwnerId { get; set; }
        public User Owner { get; set; }
        public OfferStatus Status { get; set; }
        public string Tool { get; set; }
        public ToolCategory ToolCategory { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
    }
}
