using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Domain.DbContexts;
using MyToolsYourToolsBackend.Domain.Entities;

namespace MyToolsYourToolsBackend.Application.Services
{
    public class AuthService : IAuthService
    {
        private AppDbContext _dbContext;

        public AuthService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UserDto Login(LoginCredentialsDto loginCredentials)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.UserName == loginCredentials.UserName &&
                                                   u.Password == loginCredentials.Password);

            return user == null ? null : Mapper.Map<UserDto>(user);
        }

        public UserDto Register(RegisterCredentialsDto registerCredentials)
        {
            var userToSave = Mapper.Map<User>(registerCredentials);

            _dbContext.Add(userToSave);

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not register user");
            }

            return Mapper.Map<UserDto>(userToSave);
        }
    }
}
