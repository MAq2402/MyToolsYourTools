using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using AutoMapper;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Domain.DbContexts;
using MyToolsYourToolsBackend.Domain.Entities;

namespace MyToolsYourToolsBackend.Application.Services
{
    public class OpinionService : IOpinionService
    {
        private AppDbContext _dbContext;

        public OpinionService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public OpinionDto AddOpinion(OpinionForCreationDto opinion, Guid ratedUserId, Guid ratingUserId)
        {
            var opinionToSave = Mapper.Map<Opinion>(opinion);

            
            _dbContext.Users.FirstOrDefault(u => u.Id == ratingUserId ).GivenOpinions.Add(opinionToSave);
            _dbContext.Users.FirstOrDefault(u => u.Id == ratedUserId).ReceivedOpinions.Add(opinionToSave);

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
    }
}
