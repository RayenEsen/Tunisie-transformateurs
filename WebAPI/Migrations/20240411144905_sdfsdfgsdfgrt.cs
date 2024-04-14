using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class sdfsdfgsdfgrt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Conclusion",
                table: "EchauffementBTs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Controleur1",
                table: "EchauffementBTs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateOnly>(
                name: "Date",
                table: "EchauffementBTs",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<string>(
                name: "Verificateur",
                table: "EchauffementBTs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Visa",
                table: "EchauffementBTs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<float>(
                name: "Vl",
                table: "EchauffementBTs",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Conclusion",
                table: "EchauffementBTs");

            migrationBuilder.DropColumn(
                name: "Controleur1",
                table: "EchauffementBTs");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "EchauffementBTs");

            migrationBuilder.DropColumn(
                name: "Verificateur",
                table: "EchauffementBTs");

            migrationBuilder.DropColumn(
                name: "Visa",
                table: "EchauffementBTs");

            migrationBuilder.DropColumn(
                name: "Vl",
                table: "EchauffementBTs");
        }
    }
}
