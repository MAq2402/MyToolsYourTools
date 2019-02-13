using MyToolsYourToolsBackend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Dtos
{
    public class OpinionDto
    {
        public Guid Id { get; set; }
        public string Message { get; set; }
        public Guid RatedUserId { get; set; }
        public Guid RatingUserId { get; set; }


    }
}
