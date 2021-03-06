﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MyToolsYourToolsBackend.API.Infrastructure;
using MyToolsYourToolsBackend.Application.Services;
using MyToolsYourToolsBackend.Domain.DbContexts;

namespace MyToolsYourToolsBackend.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "MyToolsYourTools", Version = "v1" });
            });

            services.AddCors(options =>
            {
                options.AddPolicy("MyToolsYourTools",
                builder => builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod());
            });

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IOfferService, OfferService>();
            services.AddScoped<IGroupService, GroupService>();
            services.AddScoped<IUserGroupService, UserGroupService>();
            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<IRentService, RentService>();
            services.AddScoped<IOpinionService, OpinionService>();
            services.AddTransient<IPointsService, PointsService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyToolsYourTools");
            });
            AutoMapperConfiguration.Configure();

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
