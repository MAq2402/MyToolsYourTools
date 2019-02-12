using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Domain.DbContexts;
using MyToolsYourToolsBackend.Domain.Entities;

namespace MyToolsYourToolsBackend.Application.Services
{
    public class RentService : IRentService
    {
        private AppDbContext _dbContext;
        private INotificationService _notificationService;

        public RentService(AppDbContext dbContext, INotificationService notificationService)
        {
            _dbContext = dbContext;
            _notificationService = notificationService;
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
            borrower.Points -= pointsCost;
            _dbContext.Offers.FirstOrDefault(o => o.Id == rent.OfferId).Status = Domain.Enums.OfferStatus.Rented;

            // delete all rentRequests of this offer
            // TODO zmienić na froncie żeby już nie usuwał
            var rentRequestsToRemove = _dbContext.Notifications.Where(n => n.OfferId == rent.OfferId && n.Type == Domain.Enums.NotificationType.RentRequest);
            _dbContext.RemoveRange(rentRequestsToRemove);
            
            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not add rent");
            }

            return rentToSave;

        }

        public void DeleteRent(Guid offerId, int pointsReward)
        {
            var rentToDelete = _dbContext.Rents.FirstOrDefault(r => r.OfferId == offerId);
            
            _dbContext.Rents.Remove(rentToDelete);
            _dbContext.Offers.FirstOrDefault(o => o.Id == rentToDelete.OfferId).Status = Domain.Enums.OfferStatus.Active;
            _dbContext.Users.FirstOrDefault(u => u.Id == rentToDelete.BorrowerId).Points += pointsReward;

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

            _notificationService.AddNotification(notificationToSend);

        }

    }
}
