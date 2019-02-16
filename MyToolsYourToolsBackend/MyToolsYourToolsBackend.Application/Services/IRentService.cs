using MyToolsYourToolsBackend.Domain.Entities;
using MyToolsYourToolsBackend.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Services
{
    public interface IRentService
    {
        bool CheckIfUserHasEnoughPoints(Guid userId);
        Rent AddRent(RentDto rent);
        RentDto DeleteRent(Guid offerId);
    }
}
