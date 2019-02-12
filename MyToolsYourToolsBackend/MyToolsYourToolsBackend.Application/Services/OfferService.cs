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
    public class OfferService : IOfferService
    {
        private AppDbContext _dbContext;

        public OfferService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public OfferDto AddOffer(OfferForCreationDto offer, Guid userId)
        {
            var offerToSave = Mapper.Map<Offer>(offer);

            _dbContext.Users.FirstOrDefault(u => u.Id == userId).Offers.Add(offerToSave);

            if(_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not add offer");
            }

            return Mapper.Map<OfferDto>(offerToSave);

        }

        public IEnumerable<OfferDto> GetAllOffers()
        {
            return Mapper.Map<IEnumerable<OfferDto>>(_dbContext.Offers);
        }

        public OfferDto GetOffer(Guid id)
        {
            var offerFromRepo = _dbContext.Offers.FirstOrDefault(o => o.Id == id);

            return Mapper.Map<OfferDto>(offerFromRepo);
        }

        public IEnumerable<OfferDto> GetUserOffers(Guid userId)
        {
            var offersFromRepo = _dbContext.Offers.Where(o => o.OwnerId == userId);

            return Mapper.Map<IEnumerable<OfferDto>>(offersFromRepo);
        }

        public bool CheckIfOfferIsActive(Guid offerId)
        {
            return _dbContext.Offers.FirstOrDefault(o => o.Id == offerId).Status == Domain.Enums.OfferStatus.Active; 
        }
    }
}
