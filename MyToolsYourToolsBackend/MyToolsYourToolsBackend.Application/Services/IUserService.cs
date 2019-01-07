﻿using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Services
{
    public interface IUserService
    {
        IEnumerable<User> GetUsers();
    }
}