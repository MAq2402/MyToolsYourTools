using Microsoft.EntityFrameworkCore;
using MyToolsYourToolsBackend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyToolsYourToolsBackend.Domain.DbContexts
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
        public DbSet<Rent> Rents { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Opinion> Opinions { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserGroup>()
                .HasKey(ug => new { ug.UserId, ug.GroupId });
            modelBuilder.Entity<UserGroup>()
                .HasOne(ug => ug.User)
                .WithMany(u => u.UserGroups)
                .HasForeignKey(ug => ug.UserId);
            modelBuilder.Entity<UserGroup>()
                .HasOne(ug => ug.Group)
                .WithMany(g => g.UserGroups)
                .HasForeignKey(ug => ug.GroupId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.TargetedNotifications)
                .WithOne(n => n.TargetUser)
                .HasForeignKey(n => n.TargetUserId);

            modelBuilder.Entity<User>()
              .HasMany(u => u.SentNotifications)
              .WithOne(n => n.Owner)
              .HasForeignKey(n => n.OwnerId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.ReceivedOpinions)
                .WithOne(o => o.RatedUser)
                .HasForeignKey(o => o.RatedUserId);

            modelBuilder.Entity<User>()
              .HasMany(u => u.GivenOpinions)
              .WithOne(o => o.RatingUser)
              .HasForeignKey(o => o.RatingUserId);
        }
    }
}
