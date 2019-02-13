using MyToolsYourToolsBackend.Domain.Entities;
using MyToolsYourToolsBackend.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Services
{
    public interface IRentService
    {
        bool CheckIfUserHasEnoughPoints(Guid userId, int sumToSubtract);
        Rent AddRent(RentDto rent, int pointsCost);
        RentDto DeleteRent(Guid offerId, int pointsReward);
    }
}
