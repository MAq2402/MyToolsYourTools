using MyToolsYourToolsBackend.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Services
{
    public interface IAuthService
    {
        UserDto Register(RegisterCredentialsDto registerCredentials);
        UserDto Login(LoginCredentialsDto loginCredentials);
    }
}
