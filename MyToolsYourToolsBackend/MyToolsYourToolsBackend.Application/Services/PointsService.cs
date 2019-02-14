using System;
using System.Collections.Generic;
using System.Text;
using MyToolsYourToolsBackend.Application.Strategies.Points;
using MyToolsYourToolsBackend.Domain.Entities;

namespace MyToolsYourToolsBackend.Application.Services
{
    public class PointsService : IPointsService
    {
        public void ModifyPoints(User user, IPointsModificationStrategy strategy)
        {
            user.Points = strategy.Modify(user.Points);
        }
    }
}
