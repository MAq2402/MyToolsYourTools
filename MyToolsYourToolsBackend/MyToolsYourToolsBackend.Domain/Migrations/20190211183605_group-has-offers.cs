using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyToolsYourToolsBackend.Domain.Migrations
{
    public partial class grouphasoffers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Picture",
                table: "Offers",
                newName: "ImageSource");

            migrationBuilder.AddColumn<Guid>(
                name: "GroupId",
                table: "Offers",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Offers_GroupId",
                table: "Offers",
                column: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Groups_GroupId",
                table: "Offers",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Groups_GroupId",
                table: "Offers");

            migrationBuilder.DropIndex(
                name: "IX_Offers_GroupId",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "Offers");

            migrationBuilder.RenameColumn(
                name: "ImageSource",
                table: "Offers",
                newName: "Picture");
        }
    }
}
