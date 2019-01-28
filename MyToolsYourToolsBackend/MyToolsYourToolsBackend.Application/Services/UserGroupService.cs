﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Domain.DbContexts;
using MyToolsYourToolsBackend.Domain.Entities;

namespace MyToolsYourToolsBackend.Application.Services
{
    public class UserGroupService : IUserGroupService
    {
        private AppDbContext _dbContext;

        public UserGroupService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
       
        public UserGroupDto JoinGroup(UserGroupDto userGroup)
        {
            var userGroupToSave = Mapper.Map<UserGroup>(userGroup);

            _dbContext.UserGroups.Add(userGroupToSave);

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not join the group");
            }

            return userGroup;
        }

        public bool LeaveGroup(UserGroupDto userGroup)
        {
            var userGroupToRemove = _dbContext.UserGroups.Find(new object[] { userGroup.UserId, userGroup.GroupId });

            if (userGroupToRemove == null)
            {
                return false;
            }

            _dbContext.UserGroups.Remove(userGroupToRemove);

            if( _dbContext.SaveChanges() == 0)
            {
                return false;
            }

            return true;
        }
    }
}
