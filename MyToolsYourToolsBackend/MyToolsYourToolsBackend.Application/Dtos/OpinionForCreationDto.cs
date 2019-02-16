using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using MyToolsYourToolsBackend.Domain.Entities;
namespace MyToolsYourToolsBackend.Application.Dtos
{
    public class OpinionForCreationDto
    {
        [Required(ErrorMessage = "Treść wiadomości nie może byc pusta")]
        public string Message { get; set; }

    }
}
