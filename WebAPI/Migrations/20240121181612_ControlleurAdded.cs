using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class ControlleurAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Claquage",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Iog",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Iom",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Na0",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Na1",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Nb0",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Nb2",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Nc0",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Nc3",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "T1",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "T2",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "T3",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Temp",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "U1",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "U2",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "U3",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Uccm",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Wccg",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Wccm1",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Wccm2",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Wog",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Wom",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Zccg",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Zccm1",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Zcmm2",
                table: "pvs",
                type: "real",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "controleurDeQualités",
                columns: table => new
                {
                    IdC = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Prenom = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Tel = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Birthdate = table.Column<DateTime>(type: "date", nullable: true),
                    Department = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Designation = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Adresse = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Region = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    CodePostal = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_controleurDeQualités", x => x.IdC);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "controleurDeQualités");

            migrationBuilder.DropColumn(
                name: "Claquage",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Iog",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Iom",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Na0",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Na1",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Nb0",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Nb2",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Nc0",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Nc3",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "T1",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "T2",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "T3",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Temp",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "U1",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "U2",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "U3",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Uccm",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Wccg",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Wccm1",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Wccm2",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Wog",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Wom",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Zccg",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Zccm1",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Zcmm2",
                table: "pvs");
        }
    }
}
