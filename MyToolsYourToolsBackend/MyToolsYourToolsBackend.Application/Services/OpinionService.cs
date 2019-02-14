using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using AutoMapper;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Domain.DbContexts;
using MyToolsYourToolsBackend.Domain.Entities;
using MyToolsYourToolsBackend.Application.Strategies.Points;

namespace MyToolsYourToolsBackend.Application.Services
{
    public class OpinionService : IOpinionService
    {
        private AppDbContext _dbContext;
        private IPointsService _pointsService;

        public OpinionService(AppDbContext dbContext, IPointsService pointsService)
        {
            _dbContext = dbContext;
            _pointsService = pointsService;
        }

        public OpinionDto AddOpinion(OpinionForCreationDto opinion, Guid ratedUserId, Guid ratingUserId)
        {
            var opinionToSave = Mapper.Map<Opinion>(opinion);

            var ratingUser = _dbContext.Users.FirstOrDefault(u => u.Id == ratingUserId);
            ratingUser.GivenOpinions.Add(opinionToSave);

            _dbContext.Users.FirstOrDefault(u => u.Id == ratedUserId).ReceivedOpinions.Add(opinionToSave);
            _dbContext.Opinions.Add(opinionToSave);

            _pointsService.ModifyPoints(ratingUser, new PointsModificationOpinionAdditionStrategy());

            if (_dbContext.SaveChanges() == 0)
            {
                throw new Exception("Could not add opinion");
            }

            return Mapper.Map<OpinionDto>(opinionToSave);
        }
        public IEnumerable<OpinionDto> GetAllOpinions()
        {
            return Mapper.Map<IEnumerable<OpinionDto>>(_dbContext.Opinions);
        }

        public IEnumerable<OpinionDto> GetUserReceivedOpinions(Guid userId)
        {
            
            var opinionsToReturn = _dbContext.Opinions.Where(o => o.RatedUserId == userId);

            return Mapper.Map<IEnumerable<OpinionDto>>(opinionsToReturn);
        }
    }
}
