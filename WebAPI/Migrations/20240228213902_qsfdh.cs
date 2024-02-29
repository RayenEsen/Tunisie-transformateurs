using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class qsfdh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EtapeOperateurSuggestions");

            migrationBuilder.AddColumn<string>(
                name: "Operateur1",
                table: "etapes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Operateur2",
                table: "etapes",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Operateur1",
                table: "etapes");

            migrationBuilder.DropColumn(
                name: "Operateur2",
                table: "etapes");

            migrationBuilder.CreateTable(
                name: "EtapeOperateurSuggestions",
                columns: table => new
                {
                    EtapesId_Etape = table.Column<int>(type: "int", nullable: false),
                    OperateurSuggestionsIdOperateur = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EtapeOperateurSuggestions", x => new { x.EtapesId_Etape, x.OperateurSuggestionsIdOperateur });
                    table.ForeignKey(
                        name: "FK_EtapeOperateurSuggestions_OperateurSuggestions_OperateurSuggestionsIdOperateur",
                        column: x => x.OperateurSuggestionsIdOperateur,
                        principalTable: "OperateurSuggestions",
                        principalColumn: "IdOperateur",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EtapeOperateurSuggestions_etapes_EtapesId_Etape",
                        column: x => x.EtapesId_Etape,
                        principalTable: "etapes",
                        principalColumn: "Id_Etape",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EtapeOperateurSuggestions_OperateurSuggestionsIdOperateur",
                table: "EtapeOperateurSuggestions",
                column: "OperateurSuggestionsIdOperateur");
        }
    }
}
