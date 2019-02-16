using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Application.Strategies.Points;
using MyToolsYourToolsBackend.Domain.DbContexts;
using MyToolsYourToolsBackend.Domain.Entities;

namespace MyToolsYourToolsBackend.Application.Services
{
    public class AuthService : IAuthService
    {
        private AppDbContext _dbContext;
        private IPointsService _pointsService;

        public AuthService(AppDbContext dbContext, IPointsService pointsService)
        {
            _dbContext = dbContext;
            _pointsService = pointsService;
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

            _pointsService.ModifyPoints(userToSave, new PointsModificationRegistrationStrategy());

            _dbContext.Add(userToSave);

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not register user");
            }

            return Mapper.Map<UserDto>(userToSave);
        }
    }
}
