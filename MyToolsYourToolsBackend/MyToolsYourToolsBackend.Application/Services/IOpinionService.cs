using System;
using System.Collections.Generic;
using System.Text;
using MyToolsYourToolsBackend.Application.Dtos;

namespace MyToolsYourToolsBackend.Application.Services
{
    public interface IOpinionService
    {
        IEnumerable<OpinionDto> GetAllOpinions();
        OpinionDto AddOpinion(OpinionForCreationDto opinion, Guid ratedUserId, Guid ratingUserId);

        IEnumerable<OpinionDto> GetUserReceivedOpinions(Guid userId);
    }
}
