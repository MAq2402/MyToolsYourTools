using MyToolsYourToolsBackend.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Services
{
    public interface IOfferService
    {
        IEnumerable<OfferDto> GetUserOffers(Guid userId);
        IEnumerable<OfferDto> GetAllOffers();
        OfferDto AddOffer(OfferForCreationDto offer, Guid userId);
        OfferDto GetOffer(Guid id);
        bool CheckIfOfferIsActive(Guid offerId);
    }
}
