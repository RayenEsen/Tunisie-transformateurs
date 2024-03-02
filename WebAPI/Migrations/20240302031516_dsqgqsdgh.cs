using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class dsqgqsdgh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EcuvageValues",
                columns: table => new
                {
                    IdEcuvageValues = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Numero = table.Column<int>(type: "int", nullable: false),
                    V1 = table.Column<int>(type: "int", nullable: false),
                    V2 = table.Column<int>(type: "int", nullable: false),
                    V3 = table.Column<int>(type: "int", nullable: false),
                    V4 = table.Column<int>(type: "int", nullable: false),
                    V5 = table.Column<int>(type: "int", nullable: false),
                    V6 = table.Column<int>(type: "int", nullable: false),
                    V7 = table.Column<int>(type: "int", nullable: false),
                    V8 = table.Column<int>(type: "int", nullable: false),
                    V9 = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EcuvageValues", x => x.IdEcuvageValues);
                    table.ForeignKey(
                        name: "FK_EcuvageValues_transformateurs_Numero",
                        column: x => x.Numero,
                        principalTable: "transformateurs",
                        principalColumn: "Numero",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EcuvageValues_Numero",
                table: "EcuvageValues",
                column: "Numero");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EcuvageValues");
        }
    }
}
