using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class sfdgsdfg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "transformateurs");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "controleurDeQualités",
                type: "nvarchar(100)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "controleurDeQualités");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "transformateurs",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
