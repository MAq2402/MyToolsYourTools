﻿using System;
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
    public class OfferService : IOfferService
    {
        private AppDbContext _dbContext;

        public OfferService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public OfferDto ActivateOffer(Guid id)
        {
            var offer = _dbContext.Offers.FirstOrDefault(o => o.Id == id);
            offer.Status = OfferStatus.Active;

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not activate offer");
            }

            return Mapper.Map<OfferDto>(offer);
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

        public bool CheckIfOfferExists(Guid id)
        {
            return _dbContext.Offers.Any(o => o.Id == id);
        }

        public bool CheckIfOfferIsActive(Guid id)
        {
            return _dbContext.Offers.FirstOrDefault(o => o.Id == id).Status == OfferStatus.Active;
        }

        public IEnumerable<OfferDto> GetAllOffers(bool onlyActive)
        {
            if (onlyActive)
            {
                return Mapper.Map<IEnumerable<OfferDto>>(_dbContext.Offers.Where(o => o.Status == OfferStatus.Active));
            }
            else
            {
                return Mapper.Map<IEnumerable<OfferDto>>(_dbContext.Offers);
            }
            
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

        public OfferDto HideOffer(Guid id)
        {
            var offer = _dbContext.Offers.FirstOrDefault(o => o.Id == id);
            offer.Status = OfferStatus.Hidden;

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not hide offer");
            }

            return Mapper.Map<OfferDto>(offer);
        }
    }
}
