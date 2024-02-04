using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class MagnetiqueTableAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "nom",
                table: "bobinageMTs",
                newName: "Nom");

            migrationBuilder.CreateTable(
                name: "magnetiques",
                columns: table => new
                {
                    IdMagnetique = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Numero = table.Column<int>(type: "int", nullable: false),
                    F1c1m = table.Column<int>(type: "int", nullable: true),
                    F1c1p = table.Column<int>(type: "int", nullable: true),
                    F2c2m = table.Column<int>(type: "int", nullable: true),
                    F2c2p = table.Column<int>(type: "int", nullable: true),
                    F3c3m = table.Column<int>(type: "int", nullable: true),
                    F3c3p = table.Column<int>(type: "int", nullable: true),
                    C4m = table.Column<int>(type: "int", nullable: true),
                    C4p = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_magnetiques", x => x.IdMagnetique);
                    table.ForeignKey(
                        name: "FK_magnetiques_transformateurs_Numero",
                        column: x => x.Numero,
                        principalTable: "transformateurs",
                        principalColumn: "Numero",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_magnetiques_Numero",
                table: "magnetiques",
                column: "Numero");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "magnetiques");

            migrationBuilder.RenameColumn(
                name: "Nom",
                table: "bobinageMTs",
                newName: "nom");
        }
    }
}
