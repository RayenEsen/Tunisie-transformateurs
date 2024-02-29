using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddMigrationsghdfhsfh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Controleur",
                table: "bobinageMTs");

            migrationBuilder.DropColumn(
                name: "Verificateur",
                table: "bobinageMTs");

            migrationBuilder.DropColumn(
                name: "Controleur",
                table: "Bobinage");

            migrationBuilder.DropColumn(
                name: "Verificateur",
                table: "Bobinage");

            migrationBuilder.AddColumn<string>(
                name: "Controleur",
                table: "etapes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Verificateur",
                table: "etapes",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Controleur",
                table: "etapes");

            migrationBuilder.DropColumn(
                name: "Verificateur",
                table: "etapes");

            migrationBuilder.AddColumn<string>(
                name: "Controleur",
                table: "bobinageMTs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Verificateur",
                table: "bobinageMTs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Controleur",
                table: "Bobinage",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Verificateur",
                table: "Bobinage",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
