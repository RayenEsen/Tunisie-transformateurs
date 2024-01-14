using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Transformateurs",
                columns: table => new
                {
                    Numero = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Marque = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Client = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Norme = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Power = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MT_U1 = table.Column<float>(type: "real", nullable: false),
                    MT_I1 = table.Column<float>(type: "real", nullable: false),
                    BT_U2 = table.Column<float>(type: "real", nullable: false),
                    BT_I2 = table.Column<float>(type: "real", nullable: false),
                    Nb_Phase = table.Column<int>(type: "int", nullable: false),
                    Prises = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Couplage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cooling = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Frequency = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transformateurs", x => x.Numero);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transformateurs");
        }
    }
}
