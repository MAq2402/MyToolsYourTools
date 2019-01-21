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
        public OfferDto AddOffer(OfferForCreationDto offer)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<OfferDto> GetOffers(Guid userId)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
            var userGroups = _dbContext.UserGroups.Where(x => x.UserId == userId);
            //var offers = _dbContext.Offers.Where(x => userGroups.Any(y => x.OwnerId == y.UserId));


            return Mapper.Map<IEnumerable<OfferDto>>(_dbContext.Offers);
        }
    }
}
