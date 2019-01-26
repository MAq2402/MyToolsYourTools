using MyToolsYourToolsBackend.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Dtos
{
    public class OfferForCreationDto
    { 
        public OfferStatus Status { get; set; }
        public string Tool { get; set; }
        public ToolCategory ToolCategory { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
    }
}
