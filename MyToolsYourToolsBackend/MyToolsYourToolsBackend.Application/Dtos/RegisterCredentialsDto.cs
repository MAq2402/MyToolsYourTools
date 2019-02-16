using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Dtos
{
    public class RegisterCredentialsDto
    {
        [Required(ErrorMessage = "Nazwa użytkownika nie może byc pusta")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Hasło nie może być puste")]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "Hasła nie są identyczne")]
        [Required(ErrorMessage = "Hasło nie może być puste")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Adres email nie może być pusty")]
        [DataType(DataType.EmailAddress,ErrorMessage ="Adres email nie jest poprawny")]
        public string Email { get; set; }
        
        [DataType(DataType.PhoneNumber, ErrorMessage = "Numer telefonu nie jest poprawny")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Imie nie może byc puste")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Nazwisko nie może byc puste")]
        public string LastName { get; set; }
    }
}
