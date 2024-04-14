using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class sfgsdfg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "I",
                table: "EchauffementBTs");

            migrationBuilder.DropColumn(
                name: "R2BT",
                table: "EchauffementBTs");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "I",
                table: "EchauffementBTs",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "R2BT",
                table: "EchauffementBTs",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
