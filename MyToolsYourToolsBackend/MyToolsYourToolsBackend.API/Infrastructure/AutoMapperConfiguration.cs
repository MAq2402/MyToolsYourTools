using AutoMapper;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Domain.Entities;
using MyToolsYourToolsBackend.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyToolsYourToolsBackend.API.Infrastructure
{
    public static class AutoMapperConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<RegisterCredentialsDto, User>();
                cfg.CreateMap<User, UserDto>();

                cfg.CreateMap<Offer, OfferDto>();
                cfg.CreateMap<OfferForCreationDto, Offer>()
                .ForMember(dest => dest.ToolCategory, opt => opt.MapFrom(src => (ToolCategory)src.ToolCategoryEnumerationNumber));

                cfg.CreateMap<Group, GroupDto>();
                cfg.CreateMap<GroupForCreationDto, Group>();

                cfg.CreateMap<UserGroupDto, UserGroup>();
            });
        }
    }
}
