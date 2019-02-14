using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Application.Strategies.Points;
using MyToolsYourToolsBackend.Domain.DbContexts;
using MyToolsYourToolsBackend.Domain.Entities;
using MyToolsYourToolsBackend.Domain.Enums;

namespace MyToolsYourToolsBackend.Application.Services
{
    public class RentService : IRentService
    {
        private AppDbContext _dbContext;
        private INotificationService _notificationService;
        private IPointsService _pointsService;

        public RentService(AppDbContext dbContext, INotificationService notificationService, IPointsService pointsService)
        {
            _dbContext = dbContext;
            _notificationService = notificationService;
            _pointsService = pointsService;
        }

        public bool CheckIfUserHasEnoughPoints(Guid userId)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
            return new PointsModificationToolBorrowingStrategy().Modify(user.Points) > 0;
        }

        public Rent AddRent(RentDto rent)
        {
            var rentToSave = Mapper.Map<Rent>(rent);
            var offer = _dbContext.Offers.FirstOrDefault(o => o.Id == rent.OfferId);
            var borrower = _dbContext.Users.FirstOrDefault(u => u.Id == rent.BorrowerId);
            var rentingUser = _dbContext.Users.FirstOrDefault(r => r.Id == offer.OwnerId);

            borrower.Rents.Add(rentToSave);
            offer.Status = OfferStatus.Rented;

            // delete all remaining rentRequests of this offer
            IList<Notification> rentRequestsToRemove = _dbContext.Notifications
                .Where(n => n.OfferId == rent.OfferId
                        && n.Type == NotificationType.RentRequest
                        && n.TargetUserId != borrower.Id).ToList<Notification>();

            _pointsService.ModifyPoints(rentingUser, new PointsModificationToolRentingStrategy());
            _pointsService.ModifyPoints(borrower, new PointsModificationToolBorrowingStrategy());


            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not add rent");
            }

            foreach (var rentRequest in rentRequestsToRemove)
            {
                // need notificationService to return deposit
                _notificationService.DeleteNotification(rentRequest.Id);
            }

            return rentToSave;
        }

        public RentDto DeleteRent(Guid offerId)
        {
            var rentToDelete = _dbContext.Rents.FirstOrDefault(r => r.OfferId == offerId);

            var offer = _dbContext.Offers.FirstOrDefault(o => o.Id == offerId);
            var borrower = _dbContext.Users.FirstOrDefault(u => u.Id == rentToDelete.BorrowerId);

            _dbContext.Rents.Remove(rentToDelete);            
            offer.Status = OfferStatus.Active;

            _pointsService.ModifyPoints(borrower, new PointsModificationToolGiveBackStrategy());

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not delete rent");
            }

            return Mapper.Map<RentDto>(rentToDelete);
        }
    }
}
