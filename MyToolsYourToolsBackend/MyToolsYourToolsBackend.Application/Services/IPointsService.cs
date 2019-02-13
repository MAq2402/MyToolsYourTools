using MyToolsYourToolsBackend.Application.Strategies.Points;
using MyToolsYourToolsBackend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Services
{
    public interface IPointsService
    {
        void ModifyPoints(User user, IPointsModificationStrategy strategy);
    }
}
