using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Strategies.Points
{
    public class PointsModificationGetDepositStrategy : IPointsModificationStrategy
    {
        public int Modify(int points)
        {
            return points -= 7;
        }
    }
}
