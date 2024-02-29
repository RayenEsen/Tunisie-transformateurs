using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class sdfghsqdh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ControleurDeQualitéEtape");

            migrationBuilder.CreateTable(
                name: "OperateurSuggestions",
                columns: table => new
                {
                    IdOperateur = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OperateurSuggestions", x => x.IdOperateur);
                });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EtapeOperateurSuggestions");

            migrationBuilder.DropTable(
                name: "OperateurSuggestions");

            migrationBuilder.CreateTable(
                name: "ControleurDeQualitéEtape",
                columns: table => new
                {
                    ControleursIdC = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    EtapesId_Etape = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ControleurDeQualitéEtape", x => new { x.ControleursIdC, x.EtapesId_Etape });
                    table.ForeignKey(
                        name: "FK_ControleurDeQualitéEtape_controleurDeQualités_ControleursIdC",
                        column: x => x.ControleursIdC,
                        principalTable: "controleurDeQualités",
                        principalColumn: "IdC",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ControleurDeQualitéEtape_etapes_EtapesId_Etape",
                        column: x => x.EtapesId_Etape,
                        principalTable: "etapes",
                        principalColumn: "Id_Etape",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ControleurDeQualitéEtape_EtapesId_Etape",
                table: "ControleurDeQualitéEtape",
                column: "EtapesId_Etape");
        }
    }
}
