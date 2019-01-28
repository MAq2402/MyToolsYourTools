using MyToolsYourToolsBackend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Dtos
{
    public class UserGroupDto
    {
        public Guid UserId { get; set; }
        public Guid GroupId { get; set; }
    }
}
