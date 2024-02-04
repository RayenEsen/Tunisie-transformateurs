using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class BobinageMT1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "bobinageMTs",
                columns: table => new
                {
                    IdBobinageMT = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Numero = table.Column<int>(type: "int", nullable: false),
                    Bt1 = table.Column<int>(type: "int", nullable: true),
                    Bt2 = table.Column<int>(type: "int", nullable: true),
                    Bt3 = table.Column<int>(type: "int", nullable: true),
                    Prevue = table.Column<int>(type: "int", nullable: true),
                    nom = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bobinageMTs", x => x.IdBobinageMT);
                    table.ForeignKey(
                        name: "FK_bobinageMTs_transformateurs_Numero",
                        column: x => x.Numero,
                        principalTable: "transformateurs",
                        principalColumn: "Numero",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_bobinageMTs_Numero",
                table: "bobinageMTs",
                column: "Numero");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "bobinageMTs");
        }
    }
}
