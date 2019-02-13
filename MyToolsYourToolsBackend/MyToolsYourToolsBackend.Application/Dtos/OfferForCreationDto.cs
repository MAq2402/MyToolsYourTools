using MyToolsYourToolsBackend.Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Dtos
{
    public class OfferForCreationDto
    { 
        [Required(ErrorMessage = "Podaj nazwę narzędzia, które chcesz wypożyczyć")]
        public string Tool { get; set; }
        [Required]
        public int ToolCategoryEnumerationNumber { get; set; }
        public string Description { get; set; }
        public string ImageSource { get; set; }

        [Required]
        public string GroupId { get; set; }
    }
}
