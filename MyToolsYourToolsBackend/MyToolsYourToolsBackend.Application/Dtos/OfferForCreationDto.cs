using MyToolsYourToolsBackend.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Dtos
{
    public class OfferForCreationDto
    { 
        public string Tool { get; set; }
        public int ToolCategoryEnumerationNumber { get; set; }
        public string Description { get; set; }
        public string ImageSource { get; set; }
        public string GroupId { get; set; }
    }
}
