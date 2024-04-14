using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class sqfgsdfnjj : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Conclusion",
                table: "Liquide",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Controleur1",
                table: "Liquide",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Liquide",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Verificateur",
                table: "Liquide",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Visa",
                table: "Liquide",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<float>(
                name: "Vl",
                table: "Liquide",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Conclusion",
                table: "Liquide");

            migrationBuilder.DropColumn(
                name: "Controleur1",
                table: "Liquide");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Liquide");

            migrationBuilder.DropColumn(
                name: "Verificateur",
                table: "Liquide");

            migrationBuilder.DropColumn(
                name: "Visa",
                table: "Liquide");

            migrationBuilder.DropColumn(
                name: "Vl",
                table: "Liquide");
        }
    }
}
