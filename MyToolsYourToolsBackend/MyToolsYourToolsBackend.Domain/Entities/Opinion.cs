using MyToolsYourToolsBackend.Domain.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Domain.Entities
{
    public class Opinion: Enitity
    {
        public string Message { get; set; }
        public Guid RatedUserId { get; set; }
        public User RatedUser { get; set; }
        public Guid RatingUserId { get; set; }
        public User RatingUser { get; set; }

    }
}
