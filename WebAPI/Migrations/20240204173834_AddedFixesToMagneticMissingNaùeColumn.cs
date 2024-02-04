using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddedFixesToMagneticMissingNaùeColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "nom",
                table: "Bobinage",
                newName: "Nom");

            migrationBuilder.AddColumn<string>(
                name: "Nom",
                table: "magnetiques",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nom",
                table: "magnetiques");

            migrationBuilder.RenameColumn(
                name: "Nom",
                table: "Bobinage",
                newName: "nom");
        }
    }
}
