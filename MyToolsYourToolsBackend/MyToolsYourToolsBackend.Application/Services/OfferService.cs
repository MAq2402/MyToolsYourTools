﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Application.Strategies.Points;
using MyToolsYourToolsBackend.Domain.DbContexts;
using MyToolsYourToolsBackend.Domain.Entities;
using MyToolsYourToolsBackend.Domain.Enums;

namespace MyToolsYourToolsBackend.Application.Services
{
    public class OfferService : IOfferService
    {
        private AppDbContext _dbContext;
        private IPointsService _pointsService;
        private INotificationService _notificationService;

        public OfferService(AppDbContext dbContext, IPointsService pointsService, INotificationService notificationService)
        {
            _dbContext = dbContext;
            _pointsService = pointsService;
            _notificationService = notificationService;
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

            var user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);

            user.Offers.Add(offerToSave);

            _pointsService.ModifyPoints(user, new PointsModificationOfferCreationStrategy());

            if (_dbContext.SaveChanges() == 0)
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

        public bool CheckIfOfferIsRented(Guid id)
        {
            return _dbContext.Offers.FirstOrDefault(o => o.Id == id).Status == OfferStatus.Rented;
        }

        public void DeleteOffer(Guid id)
        {
            var offerToDelete = _dbContext.Offers.FirstOrDefault(o => o.Id == id);

            RemoveLinkedNotification(id);

            _dbContext.Remove(offerToDelete);

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not delete offer");
            }
        }

        private void RemoveLinkedNotification(Guid id)
        {
            var notifciationToDelete = _dbContext.Notifications.FirstOrDefault(n => n.OfferId == id);

            if(notifciationToDelete != null)
            {
                _notificationService.DeleteNotification(notifciationToDelete.Id);
            }
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

        public IEnumerable<OfferDto> GetOffersForUserGroups(Guid userId)
        {
            var user = _dbContext.Users.Include(u => u.UserGroups).FirstOrDefault(u => u.Id == userId);
            var offers = _dbContext.Offers.Where(o => o.Status == OfferStatus.Active)
                                          .Where(o => o.OwnerId != userId)
                                          .Where(o => user.UserGroups.Select(ug => ug.GroupId)
                                                                     .Contains(o.GroupId));

            return Mapper.Map<IEnumerable<OfferDto>>(offers);
        }

        public IEnumerable<OfferDto> GetUserOffers(Guid userId)
        {
            var offersFromRepo = _dbContext.Offers.Where(o => o.OwnerId == userId);

            return Mapper.Map<IEnumerable<OfferDto>>(offersFromRepo);
        }

        public IEnumerable<OfferDto> GetBorrowedByUserOffers(Guid userId)
        {
            var offersBorrowedByUserIds = _dbContext.Rents.Where(r => r.BorrowerId == userId).Select(r => r.OfferId);
            var offersBorrowedByUser = _dbContext.Offers.Where(o => offersBorrowedByUserIds.Contains(o.Id));

            return Mapper.Map<IEnumerable<OfferDto>>(offersBorrowedByUser);
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
