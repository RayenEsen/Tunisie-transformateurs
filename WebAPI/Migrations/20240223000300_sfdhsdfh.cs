using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class sfdhsdfh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConseptionValues",
                columns: table => new
                {
                    ValueId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdConseption = table.Column<int>(type: "int", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Prevue = table.Column<float>(type: "real", nullable: true),
                    Mesuree = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConseptionValues", x => x.ValueId);
                    table.ForeignKey(
                        name: "FK_ConseptionValues_Conseptions_IdConseption",
                        column: x => x.IdConseption,
                        principalTable: "Conseptions",
                        principalColumn: "IdConseption",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConseptionValues_IdConseption",
                table: "ConseptionValues",
                column: "IdConseption");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConseptionValues");
        }
    }
}
