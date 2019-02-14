using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Strategies.Points
{
    public interface IPointsModificationStrategy
    {
        int Modify(int points);
    }
}
