﻿using Microsoft.EntityFrameworkCore.Migrations;

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
                name: "transformateurs",
                columns: table => new
                {
                    Numero = table.Column<int>(type: "int", nullable: false),
                    Marque = table.Column<string>(type: "nvarchar(100)", nullable: false),
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
                    Frequency = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_transformateurs", x => x.Numero);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "transformateurs");
        }
    }
}
