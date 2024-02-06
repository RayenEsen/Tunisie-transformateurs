using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class BobinageChangements : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Cnc",
                table: "bobinageMTs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Cnc",
                table: "Bobinage",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cnc",
                table: "bobinageMTs");

            migrationBuilder.DropColumn(
                name: "Cnc",
                table: "Bobinage");
        }
    }
}
