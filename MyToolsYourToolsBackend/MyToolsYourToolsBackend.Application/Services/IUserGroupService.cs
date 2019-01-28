using MyToolsYourToolsBackend.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Services
{
    public interface IUserGroupService
    {
        UserGroupDto JoinGroup(UserGroupDto userGroup);
        bool LeaveGroup(UserGroupDto userGroup);
    }
}
