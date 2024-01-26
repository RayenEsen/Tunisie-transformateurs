using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Fix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Id_C",
                table: "pvs",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_pvs_Id_C",
                table: "pvs",
                column: "Id_C");

            migrationBuilder.AddForeignKey(
                name: "FK_pvs_controleurDeQualités_Id_C",
                table: "pvs",
                column: "Id_C",
                principalTable: "controleurDeQualités",
                principalColumn: "IdC",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_pvs_controleurDeQualités_Id_C",
                table: "pvs");

            migrationBuilder.DropIndex(
                name: "IX_pvs_Id_C",
                table: "pvs");

            migrationBuilder.DropColumn(
                name: "Id_C",
                table: "pvs");
        }
    }
}
