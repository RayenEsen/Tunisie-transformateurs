using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class gfdgsh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "peintures",
                columns: table => new
                {
                    IdPeinture = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Numero = table.Column<int>(type: "int", nullable: false),
                    DatePentiure = table.Column<DateOnly>(type: "date", nullable: true),
                    Fuite = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Penture = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Isolateur = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Marquage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Neutre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Terre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Commut = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Soupage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Signature = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Vanne = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Relais = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Doigt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cosse = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Observation = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_peintures", x => x.IdPeinture);
                    table.ForeignKey(
                        name: "FK_peintures_transformateurs_Numero",
                        column: x => x.Numero,
                        principalTable: "transformateurs",
                        principalColumn: "Numero",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_peintures_Numero",
                table: "peintures",
                column: "Numero");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "peintures");
        }
    }
}
