using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class dshdh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bobinage_controleurDeQualités_ControleurIdC",
                table: "Bobinage");

            migrationBuilder.DropIndex(
                name: "IX_Bobinage_ControleurIdC",
                table: "Bobinage");

            migrationBuilder.DropColumn(
                name: "ControleurIdC",
                table: "Bobinage");

            migrationBuilder.AddColumn<string>(
                name: "Controleur",
                table: "bobinageMTs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Verificateur",
                table: "bobinageMTs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Controleur",
                table: "Bobinage",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Verificateur",
                table: "Bobinage",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Controleur",
                table: "bobinageMTs");

            migrationBuilder.DropColumn(
                name: "Verificateur",
                table: "bobinageMTs");

            migrationBuilder.DropColumn(
                name: "Controleur",
                table: "Bobinage");

            migrationBuilder.DropColumn(
                name: "Verificateur",
                table: "Bobinage");

            migrationBuilder.AddColumn<string>(
                name: "ControleurIdC",
                table: "Bobinage",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bobinage_ControleurIdC",
                table: "Bobinage",
                column: "ControleurIdC");

            migrationBuilder.AddForeignKey(
                name: "FK_Bobinage_controleurDeQualités_ControleurIdC",
                table: "Bobinage",
                column: "ControleurIdC",
                principalTable: "controleurDeQualités",
                principalColumn: "IdC");
        }
    }
}
