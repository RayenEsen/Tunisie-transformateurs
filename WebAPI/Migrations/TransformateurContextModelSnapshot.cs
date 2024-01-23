﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPI.Model;

#nullable disable

namespace WebAPI.Migrations
{
    [DbContext(typeof(TransformateurContext))]
    partial class TransformateurContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("WebAPI.Model.ControleurDeQualité", b =>
                {
                    b.Property<string>("IdC")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Adresse")
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime?>("Birthdate")
                        .HasColumnType("date");

                    b.Property<string>("CodePostal")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Department")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Designation")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Prenom")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Region")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Tel")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("IdC");

                    b.ToTable("controleurDeQualités");
                });

            modelBuilder.Entity("WebAPI.Model.Pv", b =>
                {
                    b.Property<int>("Id_pv")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id_pv"));

                    b.Property<float?>("Claquage")
                        .HasColumnType("real");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("Id_t")
                        .HasColumnType("int");

                    b.Property<float?>("Iog")
                        .HasColumnType("real");

                    b.Property<float?>("Iom")
                        .HasColumnType("real");

                    b.Property<float?>("Na0")
                        .HasColumnType("real");

                    b.Property<float?>("Na1")
                        .HasColumnType("real");

                    b.Property<float?>("Nb0")
                        .HasColumnType("real");

                    b.Property<float?>("Nb2")
                        .HasColumnType("real");

                    b.Property<float?>("Nc0")
                        .HasColumnType("real");

                    b.Property<float?>("Nc3")
                        .HasColumnType("real");

                    b.Property<string>("Resultat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float?>("T1")
                        .HasColumnType("real");

                    b.Property<float?>("T2")
                        .HasColumnType("real");

                    b.Property<float?>("T3")
                        .HasColumnType("real");

                    b.Property<float?>("Temp")
                        .HasColumnType("real");

                    b.Property<float?>("U1")
                        .HasColumnType("real");

                    b.Property<float?>("U2")
                        .HasColumnType("real");

                    b.Property<float?>("U3")
                        .HasColumnType("real");

                    b.Property<float?>("Uccm")
                        .HasColumnType("real");

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

                    b.Property<float?>("Wccg")
                        .HasColumnType("real");

                    b.Property<float?>("Wccm1")
                        .HasColumnType("real");

                    b.Property<float?>("Wccm2")
                        .HasColumnType("real");

                    b.Property<float?>("Wog")
                        .HasColumnType("real");

                    b.Property<float?>("Wom")
                        .HasColumnType("real");

                    b.Property<float?>("Zccg")
                        .HasColumnType("real");

                    b.Property<float?>("Zccm1")
                        .HasColumnType("real");

                    b.Property<float?>("Zcmm2")
                        .HasColumnType("real");

                    b.Property<int?>("tappings")
                        .HasColumnType("int");

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

                    b.Property<float>("Cc")
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

                    b.Property<string>("Libelle")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

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
