using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AnotherOne : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Vm11",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vm12",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vm13",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vm21",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vm22",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vm23",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vm31",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vm32",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vm33",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vm41",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vm42",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vm43",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vm51",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vm52",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vm53",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vt11",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Vt12",
                table: "pvs",
                type: "real",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Vm11",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vm12",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vm13",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vm21",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vm22",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vm23",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vm31",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vm32",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vm33",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vm41",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vm42",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vm43",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vm51",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vm52",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vm53",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vt11",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Vt12",
                table: "pvs");
        }
    }
}
