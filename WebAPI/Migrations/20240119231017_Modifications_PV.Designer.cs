﻿// <auto-generated />
using System;
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
    [Migration("20240119231017_Modifications_PV")]
    partial class Modifications_PV
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("WebAPI.Model.Pv", b =>
                {
                    b.Property<int>("Id_pv")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id_pv"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("Id_t")
                        .HasColumnType("int");

                    b.Property<string>("Resultat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float?>("Vm11")
                        .HasColumnType("real");

                    b.Property<float?>("Vm12")
                        .HasColumnType("real");

                    b.Property<float?>("Vm13")
                        .HasColumnType("real");

                    b.Property<float?>("Vm21")
                        .HasColumnType("real");

                    b.Property<float?>("Vm22")
                        .HasColumnType("real");

                    b.Property<float?>("Vm23")
                        .HasColumnType("real");

                    b.Property<float?>("Vm31")
                        .HasColumnType("real");

                    b.Property<float?>("Vm32")
                        .HasColumnType("real");

                    b.Property<float?>("Vm33")
                        .HasColumnType("real");

                    b.Property<float?>("Vm41")
                        .HasColumnType("real");

                    b.Property<float?>("Vm42")
                        .HasColumnType("real");

                    b.Property<float?>("Vm43")
                        .HasColumnType("real");

                    b.Property<float?>("Vm51")
                        .HasColumnType("real");

                    b.Property<float?>("Vm52")
                        .HasColumnType("real");

                    b.Property<float?>("Vm53")
                        .HasColumnType("real");

                    b.Property<float?>("Vt11")
                        .HasColumnType("real");

                    b.Property<float?>("Vt12")
                        .HasColumnType("real");

                    b.Property<float?>("Vt21")
                        .HasColumnType("real");

                    b.Property<float?>("Vt22")
                        .HasColumnType("real");

                    b.Property<float?>("Vt31")
                        .HasColumnType("real");

                    b.Property<float?>("Vt32")
                        .HasColumnType("real");

                    b.Property<float?>("Vt41")
                        .HasColumnType("real");

                    b.Property<float?>("Vt42")
                        .HasColumnType("real");

                    b.Property<float?>("Vt51")
                        .HasColumnType("real");

                    b.Property<float?>("Vt52")
                        .HasColumnType("real");

                    b.HasKey("Id_pv");

                    b.HasIndex("Id_t")
                        .IsUnique();

                    b.ToTable("pvs");
                });

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

            modelBuilder.Entity("WebAPI.Model.Pv", b =>
                {
                    b.HasOne("WebAPI.Model.Transformateur", "Transformateur")
                        .WithOne("Pv")
                        .HasForeignKey("WebAPI.Model.Pv", "Id_t")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Transformateur");
                });

            modelBuilder.Entity("WebAPI.Model.Transformateur", b =>
                {
                    b.Navigation("Pv");
                });
#pragma warning restore 612, 618
        }
    }
}
