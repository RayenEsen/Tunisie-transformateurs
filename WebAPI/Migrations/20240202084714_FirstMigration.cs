using System;
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
                name: "controleurDeQualités",
                columns: table => new
                {
                    IdC = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Prenom = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Tel = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Birthdate = table.Column<DateTime>(type: "date", nullable: true),
                    Department = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Designation = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Adresse = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Region = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    CodePostal = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_controleurDeQualités", x => x.IdC);
                });

            migrationBuilder.CreateTable(
                name: "transformateurs",
                columns: table => new
                {
                    Numero = table.Column<int>(type: "int", nullable: false),
                    Marque = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Client = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Norme = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Power = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Mtu1 = table.Column<float>(type: "real", nullable: false),
                    Mtu2 = table.Column<float>(type: "real", nullable: false),
                    Btu2 = table.Column<float>(type: "real", nullable: false),
                    Bti2 = table.Column<float>(type: "real", nullable: false),
                    Nbphase = table.Column<int>(type: "int", nullable: false),
                    Prises = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Couplage = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Cooling = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Libelle = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Frequency = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_transformateurs", x => x.Numero);
                });

            migrationBuilder.CreateTable(
                name: "etapes",
                columns: table => new
                {
                    Id_Etape = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EtapeNumero = table.Column<int>(type: "int", nullable: false),
                    Numero = table.Column<int>(type: "int", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Operateur1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Operateur2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateDebut = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DateFin = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_etapes", x => x.Id_Etape);
                    table.ForeignKey(
                        name: "FK_etapes_transformateurs_Numero",
                        column: x => x.Numero,
                        principalTable: "transformateurs",
                        principalColumn: "Numero",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "pvs",
                columns: table => new
                {
                    Id_pv = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_t = table.Column<int>(type: "int", nullable: false),
                    IdC = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Resultat = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tappings = table.Column<int>(type: "int", nullable: true),
                    Version = table.Column<int>(type: "int", nullable: true),
                    Vt11 = table.Column<float>(type: "real", nullable: true),
                    Vt12 = table.Column<float>(type: "real", nullable: true),
                    Vt21 = table.Column<float>(type: "real", nullable: true),
                    Vt22 = table.Column<float>(type: "real", nullable: true),
                    Vt31 = table.Column<float>(type: "real", nullable: true),
                    Vt32 = table.Column<float>(type: "real", nullable: true),
                    Vt41 = table.Column<float>(type: "real", nullable: true),
                    Vt42 = table.Column<float>(type: "real", nullable: true),
                    Vt51 = table.Column<float>(type: "real", nullable: true),
                    Vt52 = table.Column<float>(type: "real", nullable: true),
                    Vm11 = table.Column<float>(type: "real", nullable: true),
                    Vm12 = table.Column<float>(type: "real", nullable: true),
                    Vm13 = table.Column<float>(type: "real", nullable: true),
                    Vm21 = table.Column<float>(type: "real", nullable: true),
                    Vm22 = table.Column<float>(type: "real", nullable: true),
                    Vm23 = table.Column<float>(type: "real", nullable: true),
                    Vm31 = table.Column<float>(type: "real", nullable: true),
                    Vm32 = table.Column<float>(type: "real", nullable: true),
                    Vm33 = table.Column<float>(type: "real", nullable: true),
                    Vm41 = table.Column<float>(type: "real", nullable: true),
                    Vm42 = table.Column<float>(type: "real", nullable: true),
                    Vm43 = table.Column<float>(type: "real", nullable: true),
                    Vm51 = table.Column<float>(type: "real", nullable: true),
                    Vm52 = table.Column<float>(type: "real", nullable: true),
                    Vm53 = table.Column<float>(type: "real", nullable: true),
                    Na0 = table.Column<float>(type: "real", nullable: true),
                    Nb0 = table.Column<float>(type: "real", nullable: true),
                    Nc0 = table.Column<float>(type: "real", nullable: true),
                    Na1 = table.Column<float>(type: "real", nullable: true),
                    Nb2 = table.Column<float>(type: "real", nullable: true),
                    Nc3 = table.Column<float>(type: "real", nullable: true),
                    Wog = table.Column<float>(type: "real", nullable: true),
                    Iog = table.Column<float>(type: "real", nullable: true),
                    Iom = table.Column<float>(type: "real", nullable: true),
                    Wom = table.Column<float>(type: "real", nullable: true),
                    Zccg = table.Column<float>(type: "real", nullable: true),
                    Wccg = table.Column<float>(type: "real", nullable: true),
                    Temp = table.Column<float>(type: "real", nullable: true),
                    Uccm = table.Column<float>(type: "real", nullable: true),
                    Wccm1 = table.Column<float>(type: "real", nullable: true),
                    Wccm2 = table.Column<float>(type: "real", nullable: true),
                    Zccm1 = table.Column<float>(type: "real", nullable: true),
                    Zcmm2 = table.Column<float>(type: "real", nullable: true),
                    U1 = table.Column<float>(type: "real", nullable: true),
                    T1 = table.Column<float>(type: "real", nullable: true),
                    U2 = table.Column<float>(type: "real", nullable: true),
                    T2 = table.Column<float>(type: "real", nullable: true),
                    U3 = table.Column<float>(type: "real", nullable: true),
                    T3 = table.Column<float>(type: "real", nullable: true),
                    Claquage = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pvs", x => x.Id_pv);
                    table.ForeignKey(
                        name: "FK_pvs_controleurDeQualités_IdC",
                        column: x => x.IdC,
                        principalTable: "controleurDeQualités",
                        principalColumn: "IdC",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_pvs_transformateurs_Id_t",
                        column: x => x.Id_t,
                        principalTable: "transformateurs",
                        principalColumn: "Numero",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_etapes_Numero",
                table: "etapes",
                column: "Numero");

            migrationBuilder.CreateIndex(
                name: "IX_pvs_Id_t",
                table: "pvs",
                column: "Id_t",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_pvs_IdC",
                table: "pvs",
                column: "IdC");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "etapes");

            migrationBuilder.DropTable(
                name: "pvs");

            migrationBuilder.DropTable(
                name: "controleurDeQualités");

            migrationBuilder.DropTable(
                name: "transformateurs");
        }
    }
}
