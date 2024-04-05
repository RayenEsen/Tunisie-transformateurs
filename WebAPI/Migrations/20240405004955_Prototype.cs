using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Prototype : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Perte_totale",
                table: "transformateurs",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "R1BT",
                table: "transformateurs",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "R1MT",
                table: "transformateurs",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Temperature",
                table: "transformateurs",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Perte_totale",
                table: "transformateurs");

            migrationBuilder.DropColumn(
                name: "R1BT",
                table: "transformateurs");

            migrationBuilder.DropColumn(
                name: "R1MT",
                table: "transformateurs");

            migrationBuilder.DropColumn(
                name: "Temperature",
                table: "transformateurs");
        }
    }
}
