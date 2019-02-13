using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Application.Strategies.Points;
using MyToolsYourToolsBackend.Domain.DbContexts;
using MyToolsYourToolsBackend.Domain.Entities;

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

        public bool CheckIfUserHasEnoughPoints(Guid userId, int sumToSubstract)
        {
            return _dbContext.Users.FirstOrDefault(u => u.Id == userId).Points >= sumToSubstract;
        }

        public Rent AddRent(RentForCreationDto rent, int pointsCost)
        {
            var rentToSave = Mapper.Map<Rent>(rent);

            var borrower = _dbContext.Users.FirstOrDefault(u => u.Id == rent.BorrowerId);
            borrower.Rents.Add(rentToSave);

            var offer = _dbContext.Offers.FirstOrDefault(o => o.Id == rent.OfferId);
            offer.Status = Domain.Enums.OfferStatus.Rented;

            // delete all rentRequests of this offer
            // TODO zmienić na froncie żeby już nie usuwał
            var rentRequestsToRemove = _dbContext.Notifications.Where(n => n.OfferId == rent.OfferId && n.Type == Domain.Enums.NotificationType.RentRequest);
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
            
            _dbContext.Rents.Remove(rentToDelete);
            _dbContext.Offers.FirstOrDefault(o => o.Id == rentToDelete.OfferId).Status = Domain.Enums.OfferStatus.Active;

            // send notification of return confirmation to borrower
            var notificationToSend = new NotificationForCreationDto()
            {
                OwnerId = rentToDelete.BorrowerId,
                TargetUserId = rentToDelete.Offer.OwnerId,
                OfferId = offerId,
                Type = Domain.Enums.NotificationType.Opinion
            };

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not delete rent");
            }

            ModifyPoints(_dbContext.Users.FirstOrDefault(u => u.Id == rentToDelete.BorrowerId), new PointsModificationToolGiveBackStrategy(), true);

            _notificationService.AddNotification(notificationToSend);
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
