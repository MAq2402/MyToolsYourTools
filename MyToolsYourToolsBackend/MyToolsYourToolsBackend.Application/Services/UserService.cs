using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Domain.DbContexts;
using MyToolsYourToolsBackend.Domain.Entities;

namespace MyToolsYourToolsBackend.Application.Services
{
    public class UserService : IUserService
    {
        private AppDbContext _dbContext;

        public UserService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool CheckIfUserExists(Guid userId)
        {
            return _dbContext.Users.Any(u => u.Id == userId);
        }

        public IEnumerable<UserDto> GetUsers()
        {
            return Mapper.Map<IEnumerable<UserDto>>(_dbContext.Users);
        }

        public bool CheckIfHasEnoughPoint(Guid userId, int sumToSubstract)
        {
            return _dbContext.Users.FirstOrDefault(u => u.Id == userId).Points >= sumToSubstract;
        }
    }
}
