using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Domain.DbContexts;
using MyToolsYourToolsBackend.Domain.Entities;
using MyToolsYourToolsBackend.Domain.Enums;

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

        public Rent AddRent(RentDto rent, int pointsCost)
        {
            var rentToSave = Mapper.Map<Rent>(rent);
            var offer = _dbContext.Offers.FirstOrDefault(o => o.Id == rent.OfferId);
            var borrower = _dbContext.Users.FirstOrDefault(u => u.Id == rent.BorrowerId);

            borrower.Rents.Add(rentToSave);
            borrower.Points -= pointsCost;
            offer.Status = OfferStatus.Rented;

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

            return rentToSave;

        }

        public RentDto DeleteRent(Guid offerId, int pointsReward)
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

            _notificationService.SendNotificationFromServer(borrower.Id,
                offer.OwnerId, offerId, NotificationType.Opinion);

            return Mapper.Map<RentDto>(rentToDelete);

        }

    }
}
