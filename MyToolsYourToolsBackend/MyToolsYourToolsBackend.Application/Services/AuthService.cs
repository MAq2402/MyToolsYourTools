using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Domain.Entities;

namespace MyToolsYourToolsBackend.Application.Services
{
    public class AuthService : IAuthService
    {
        private DbContext _dbContext;

        public AuthService(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public UserDto Register(RegisterCredentialsDto registerCredentials)
        {
            var userToSave = Mapper.Map<User>(registerCredentials);

            _dbContext.Add(userToSave);

            return Mapper.Map<UserDto>(userToSave);
        }
    }
}
