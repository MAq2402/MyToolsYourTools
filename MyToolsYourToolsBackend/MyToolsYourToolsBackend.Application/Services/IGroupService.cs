using MyToolsYourToolsBackend.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Services
{
    public interface IGroupService
    {
        IEnumerable<GroupDto> GetUserGroups(Guid userId);
        IEnumerable<GroupDto> GetAllGroups();
        GroupDto AddGroup(GroupForCreationDto offer);
    }
}
