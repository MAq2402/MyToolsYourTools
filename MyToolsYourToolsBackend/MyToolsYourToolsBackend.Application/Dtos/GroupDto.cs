using MyToolsYourToolsBackend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Dtos
{
    public class GroupDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
