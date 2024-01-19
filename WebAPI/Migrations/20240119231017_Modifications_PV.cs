using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Modifications_PV : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Vt21",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vt22",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vt31",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vt32",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vt41",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vt42",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vt51",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vt52",
                table: "pvs",
                type: "real",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Vt21",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vt22",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vt31",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vt32",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vt41",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vt42",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vt51",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vt52",
                table: "pvs");
        }
    }
}
