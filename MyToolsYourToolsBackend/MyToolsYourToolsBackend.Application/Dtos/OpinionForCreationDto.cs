using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using MyToolsYourToolsBackend.Domain.Entities;
using System.ComponentModel.DataAnnotations;
namespace MyToolsYourToolsBackend.Application.Dtos
{
    public class OpinionForCreationDto
    {

        [Required(AllowEmptyStrings = false, ErrorMessage = "Wpisz opinię.")]

        public string Message { get; set; }

    }
}
