using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Testhaha : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Electrique",
                columns: table => new
                {
                    IdMagnetique = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Numero = table.Column<int>(type: "int", nullable: false),
                    P1 = table.Column<float>(type: "real", nullable: true),
                    P2 = table.Column<float>(type: "real", nullable: true),
                    P3 = table.Column<float>(type: "real", nullable: true),
                    P4 = table.Column<float>(type: "real", nullable: true),
                    P5 = table.Column<float>(type: "real", nullable: true),
                    Cnc = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Electrique", x => x.IdMagnetique);
                    table.ForeignKey(
                        name: "FK_Electrique_transformateurs_Numero",
                        column: x => x.Numero,
                        principalTable: "transformateurs",
                        principalColumn: "Numero",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Etape1",
                columns: table => new
                {
                    IdMagnetique = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Numero = table.Column<int>(type: "int", nullable: false),
                    Vp1 = table.Column<float>(type: "real", nullable: true),
                    Cnc1 = table.Column<float>(type: "real", nullable: true),
                    Vp2 = table.Column<float>(type: "real", nullable: true),
                    Cnc2 = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Etape1", x => x.IdMagnetique);
                    table.ForeignKey(
                        name: "FK_Etape1_transformateurs_Numero",
                        column: x => x.Numero,
                        principalTable: "transformateurs",
                        principalColumn: "Numero",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Electrique_Numero",
                table: "Electrique",
                column: "Numero");

            migrationBuilder.CreateIndex(
                name: "IX_Etape1_Numero",
                table: "Etape1",
                column: "Numero");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Electrique");

            migrationBuilder.DropTable(
                name: "Etape1");
        }
    }
}
