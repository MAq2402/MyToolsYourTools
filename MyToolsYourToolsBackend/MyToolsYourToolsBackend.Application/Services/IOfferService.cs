using MyToolsYourToolsBackend.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Application.Services
{
    public interface IOfferService
    {
        IEnumerable<OfferDto> GetOffers(Guid userId);
        OfferDto AddOffer(OfferForCreationDto offer);
    }
}
