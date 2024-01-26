using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class RemovedUsellessColums : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cc",
                table: "transformateurs");

            migrationBuilder.RenameColumn(
                name: "tappings",
                table: "pvs",
                newName: "Tappings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Tappings",
                table: "pvs",
                newName: "tappings");

            migrationBuilder.AddColumn<float>(
                name: "Cc",
                table: "transformateurs",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
