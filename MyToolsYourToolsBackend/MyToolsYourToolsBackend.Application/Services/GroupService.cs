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
    public class GroupService : IGroupService
    {
        private AppDbContext _dbContext;

        public GroupService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public GroupDto AddGroup(GroupForCreationDto group)
        {
            var groupToSave = Mapper.Map<Group>(group);

            _dbContext.Groups.Add(groupToSave);

            if(_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not add group");
            }

            return Mapper.Map<GroupDto>(groupToSave);

        }

        public IEnumerable<GroupDto> GetAllGroups()
        {
            return Mapper.Map<IEnumerable<GroupDto>>(_dbContext.Groups);
        }

        public IEnumerable<GroupDto> GetUserGroups(Guid userId)
        {
            var userGroupsIds = _dbContext.UserGroups.Where(g => g.UserId == userId).Select(g => g.GroupId);
            var groupsToReturn = _dbContext.Groups.Where(g => userGroupsIds.Contains(g.Id));

            return Mapper.Map<IEnumerable<GroupDto>>(groupsToReturn);
        }

    }
}
