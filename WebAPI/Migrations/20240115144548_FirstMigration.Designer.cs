﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPI.Model;

#nullable disable

namespace WebAPI.Migrations
{
    [DbContext(typeof(TransformateurContext))]
    [Migration("20240115144548_FirstMigration")]
    partial class FirstMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("WebAPI.Model.Transformateur", b =>
                {
                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<float>("Bti2")
                        .HasColumnType("real");

                    b.Property<float>("Btu2")
                        .HasColumnType("real");

                    b.Property<string>("Client")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Cooling")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Couplage")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<float>("Frequency")
                        .HasColumnType("real");

                    b.Property<string>("Marque")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<float>("Mtu1")
                        .HasColumnType("real");

                    b.Property<float>("Mtu2")
                        .HasColumnType("real");

                    b.Property<int>("Nbphase")
                        .HasColumnType("int");

                    b.Property<string>("Norme")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Power")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Prises")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Numero");

                    b.ToTable("transformateurs");
                });
#pragma warning restore 612, 618
        }
    }
}
