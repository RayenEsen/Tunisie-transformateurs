using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Hope : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "pfps",
                columns: table => new
                {
                    Idpfp = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdC = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Pathway = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pfps", x => x.Idpfp);
                    table.ForeignKey(
                        name: "FK_pfps_controleurDeQualités_IdC",
                        column: x => x.IdC,
                        principalTable: "controleurDeQualités",
                        principalColumn: "IdC",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_pfps_IdC",
                table: "pfps",
                column: "IdC",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "pfps");
        }
    }
}
