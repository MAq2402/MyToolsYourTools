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

        public Rent AddRent(RentForCreationDto rent)
        {
            var rentToSave = Mapper.Map<Rent>(rent);
            var offer = _dbContext.Offers.FirstOrDefault(o => o.Id == rent.OfferId);
            var borrower = _dbContext.Users.FirstOrDefault(u => u.Id == rent.BorrowerId);

            borrower.Rents.Add(rentToSave);
            
            var offer = _dbContext.Offers.FirstOrDefault(o => o.Id == rent.OfferId);
            offer.Status = Domain.Enums.OfferStatus.Rented;

            // delete all remaining rentRequests of this offer
            var rentRequestsToRemove = _dbContext.Notifications
                .Where(n => n.OfferId == rent.OfferId
                        && n.Type == NotificationType.RentRequest
                        && n.TargetUserId != borrower.Id);
            _dbContext.RemoveRange(rentRequestsToRemove);

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not add rent");
            }

            var rentingUser = _dbContext.Users.FirstOrDefault(r => r.Id == offer.OwnerId);

            ModifyPoints(rentingUser, new PointsModificationToolRentingStrategy(), false);
            ModifyPoints(borrower, new PointsModificationToolBorrowingStrategy(), true);
            
            return rentToSave;
        }

        public void DeleteRent(Guid offerId, int pointsReward)
        {
            var rentToDelete = _dbContext.Rents.FirstOrDefault(r => r.OfferId == offerId);

            var offer = _dbContext.Offers.FirstOrDefault(o => o.Id == offerId);
            var borrower = _dbContext.Users.FirstOrDefault(u => u.Id == rentToDelete.BorrowerId);

            _dbContext.Rents.Remove(rentToDelete);            
            offer.Status = OfferStatus.Active;
            borrower.Points += pointsReward;

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not delete rent");
            }

            ModifyPoints(borrower, new PointsModificationToolGiveBackStrategy(), true);
            
            _notificationService.SendNotificationFromServer(borrower.Id,
                offer.OwnerId, offerId, NotificationType.Opinion);
        }

        private void ModifyPoints(User user, IPointsModificationStrategy pointsModificationStrategy,bool save)
        {
            _pointsService.ModifyPoints(user, pointsModificationStrategy);

            if (save)
            {
                if (_dbContext.SaveChanges() == 0)
                {
                    throw new Exception("Could not modify points");
                }
            }   
        }

    }
}
