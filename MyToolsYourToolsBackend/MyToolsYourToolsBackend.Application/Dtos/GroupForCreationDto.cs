using MyToolsYourToolsBackend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace MyToolsYourToolsBackend.Application.Dtos
{
    public class GroupForCreationDto
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Podaj nazwę grupy.")]
        public string Name { get; set; }
    }
}
