using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class fixdb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VoltageRatios");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VoltageRatios",
                columns: table => new
                {
                    Prises = table.Column<int>(type: "int", nullable: false),
                    Id_pv = table.Column<int>(type: "int", nullable: false),
                    VM1 = table.Column<float>(type: "real", nullable: false),
                    VM2 = table.Column<float>(type: "real", nullable: false),
                    VM3 = table.Column<float>(type: "real", nullable: false),
                    VT1 = table.Column<float>(type: "real", nullable: false),
                    VT2 = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoltageRatios", x => x.Prises);
                    table.ForeignKey(
                        name: "FK_VoltageRatios_pvs_Id_pv",
                        column: x => x.Id_pv,
                        principalTable: "pvs",
                        principalColumn: "Id_pv",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VoltageRatios_Id_pv",
                table: "VoltageRatios",
                column: "Id_pv",
                unique: true);
        }
    }
}
