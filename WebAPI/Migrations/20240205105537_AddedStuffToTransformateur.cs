using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddedStuffToTransformateur : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Accessoires",
                table: "transformateurs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Assecheur",
                table: "transformateurs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Bornesembrochables",
                table: "transformateurs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Relais",
                table: "transformateurs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Thermostat",
                table: "transformateurs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Accessoires",
                table: "transformateurs");

            migrationBuilder.DropColumn(
                name: "Assecheur",
                table: "transformateurs");

            migrationBuilder.DropColumn(
                name: "Bornesembrochables",
                table: "transformateurs");

            migrationBuilder.DropColumn(
                name: "Relais",
                table: "transformateurs");

            migrationBuilder.DropColumn(
                name: "Thermostat",
                table: "transformateurs");
        }
    }
}
