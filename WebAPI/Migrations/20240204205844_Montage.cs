using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Montage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "montages",
                columns: table => new
                {
                    IdMagnetique = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Numero = table.Column<int>(type: "int", nullable: false),
                    c1m = table.Column<int>(type: "int", nullable: true),
                    c1p = table.Column<int>(type: "int", nullable: true),
                    c2m = table.Column<int>(type: "int", nullable: true),
                    c2p = table.Column<int>(type: "int", nullable: true),
                    c3m = table.Column<int>(type: "int", nullable: true),
                    c3p = table.Column<int>(type: "int", nullable: true),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_montages", x => x.IdMagnetique);
                    table.ForeignKey(
                        name: "FK_montages_transformateurs_Numero",
                        column: x => x.Numero,
                        principalTable: "transformateurs",
                        principalColumn: "Numero",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_montages_Numero",
                table: "montages",
                column: "Numero");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "montages");
        }
    }
}
