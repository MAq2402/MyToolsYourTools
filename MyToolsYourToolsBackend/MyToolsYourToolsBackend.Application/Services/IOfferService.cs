﻿using MyToolsYourToolsBackend.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Services
{
    public interface IOfferService
    {
        IEnumerable<OfferDto> GetUserOffers(Guid userId);
        IEnumerable<OfferDto> GetAllOffers(bool onlyActive);
        OfferDto AddOffer(OfferForCreationDto offer, Guid userId);
        OfferDto GetOffer(Guid id);
        bool CheckIfOfferExists(Guid id);
        OfferDto ActivateOffer(Guid id);
        OfferDto HideOffer(Guid id);
        bool CheckIfOfferIsActive(Guid id);
        IEnumerable<OfferDto> GetOffersForUserGroups(Guid userId);
        void DeleteOffer(Guid id);
        IEnumerable<OfferDto> GetBorrowedByUserOffers(Guid userId);
        bool CheckIfOfferIsRented(Guid id);
    }
}
