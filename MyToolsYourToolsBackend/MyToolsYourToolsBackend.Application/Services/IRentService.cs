using MyToolsYourToolsBackend.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Services
{
    public interface IRentService
    {
        RentDto AddRent(RentForCreationDto rent, Guid userId, int pointsCost);
        bool DeleteRent(RentDto rent);
    }
}
