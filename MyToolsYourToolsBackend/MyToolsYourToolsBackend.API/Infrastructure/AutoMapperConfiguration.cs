using AutoMapper;
using MyToolsYourToolsBackend.Application.Dtos;
using MyToolsYourToolsBackend.Domain.Entities;
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
                cfg.CreateMap<OfferForCreationDto, Offer>();

                cfg.CreateMap<Group, GroupDto>();
                cfg.CreateMap<GroupForCreationDto, Group>();

                cfg.CreateMap<UserGroupDto, UserGroup>();
                cfg.CreateMap<NotificationForCreationDto,Notification>();
                cfg.CreateMap<NotificationForCreationDto,NotificationDto>();
                

            });
        }
    }
}
