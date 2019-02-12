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

        public RentService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public RentDto AddRent(RentForCreationDto rent, Guid userId, int pointsCost)
        {
            var rentToSave = Mapper.Map<Rent>(rent);

            var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
            user.Rents.Add(rentToSave);
            user.Offers.FirstOrDefault(o => o.Id == rent.OfferId).Status = Domain.Enums.OfferStatus.Rented;
            user.Points -= pointsCost;

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not add rent");
            }

            return Mapper.Map<RentDto>(rentToSave);

        }

        public bool DeleteRent(RentDto rent)
        {
            var rentToDelete = Mapper.Map<Rent>(rent);
            // TODO dodać powiadomienie przez notification.service?
            // var notificationToSend = new NotificationForCreationDto();
            
            _dbContext.Rents.Remove(rentToDelete);

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not delete rent");
            }

            return true;

        }
    }
}
