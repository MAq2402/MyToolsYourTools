using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Dtos
{
    public class LoginCredentialsDto
    {
        [Required(ErrorMessage = "Uzupełnij nazwę użytkownika")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Uzupełnij hasło")]
        public string Password { get; set; }
    }
}
