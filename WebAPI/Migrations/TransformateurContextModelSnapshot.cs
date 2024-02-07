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

            modelBuilder.Entity("WebAPI.Model.Bobinage", b =>
                {
                    b.Property<int>("IdBobinage")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdBobinage"));

                    b.Property<float?>("Bt1")
                        .HasColumnType("real");

                    b.Property<float?>("Bt2")
                        .HasColumnType("real");

                    b.Property<float?>("Bt3")
                        .HasColumnType("real");

                    b.Property<float?>("Cnc")
                        .HasColumnType("real");

                    b.Property<string>("ControleurIdC")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<float?>("Prevue")
                        .HasColumnType("real");

                    b.HasKey("IdBobinage");

                    b.HasIndex("ControleurIdC");

                    b.HasIndex("Numero");

                    b.ToTable("Bobinage");
                });

            modelBuilder.Entity("WebAPI.Model.BobinageMT", b =>
                {
                    b.Property<int>("IdBobinageMT")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdBobinageMT"));

                    b.Property<float?>("Bt1")
                        .HasColumnType("real");

                    b.Property<float?>("Bt2")
                        .HasColumnType("real");

                    b.Property<float?>("Bt3")
                        .HasColumnType("real");

                    b.Property<float?>("Cnc")
                        .HasColumnType("real");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<float?>("Prevue")
                        .HasColumnType("real");

                    b.HasKey("IdBobinageMT");

                    b.HasIndex("Numero");

                    b.ToTable("bobinageMTs");
                });

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

            modelBuilder.Entity("WebAPI.Model.Etape", b =>
                {
                    b.Property<int>("Id_Etape")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id_Etape"));

                    b.Property<DateTime?>("DateDebut")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateFin")
                        .HasColumnType("datetime2");

                    b.Property<int>("EtapeNumero")
                        .HasColumnType("int");

                    b.Property<string>("IdC")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<string>("Operateur1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Operateur2")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id_Etape");

                    b.HasIndex("IdC");

                    b.HasIndex("Numero");

                    b.ToTable("etapes");
                });

            modelBuilder.Entity("WebAPI.Model.Magnetique", b =>
                {
                    b.Property<int>("IdMagnetique")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdMagnetique"));

                    b.Property<float?>("C4m")
                        .HasColumnType("real");

                    b.Property<float?>("C4p")
                        .HasColumnType("real");

                    b.Property<float?>("F1c1m")
                        .HasColumnType("real");

                    b.Property<float?>("F1c1p")
                        .HasColumnType("real");

                    b.Property<float?>("F2c2m")
                        .HasColumnType("real");

                    b.Property<float?>("F2c2p")
                        .HasColumnType("real");

                    b.Property<float?>("F3c3m")
                        .HasColumnType("real");

                    b.Property<float?>("F3c3p")
                        .HasColumnType("real");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.HasKey("IdMagnetique");

                    b.HasIndex("Numero");

                    b.ToTable("magnetiques");
                });

            modelBuilder.Entity("WebAPI.Model.Montage", b =>
                {
                    b.Property<int>("IdMagnetique")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdMagnetique"));

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<int?>("c1m")
                        .HasColumnType("int");

                    b.Property<float?>("c1p")
                        .HasColumnType("real");

                    b.Property<float?>("c2m")
                        .HasColumnType("real");

                    b.Property<float?>("c2p")
                        .HasColumnType("real");

                    b.Property<float?>("c3m")
                        .HasColumnType("real");

                    b.Property<float?>("c3p")
                        .HasColumnType("real");

                    b.HasKey("IdMagnetique");

                    b.HasIndex("Numero");

                    b.ToTable("montages");
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

                    b.Property<string>("IdC")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

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

                    b.Property<int?>("Tappings")
                        .HasColumnType("int");

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

                    b.Property<int?>("Version")
                        .HasColumnType("int");

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

                    b.HasKey("Id_pv");

                    b.HasIndex("IdC");

                    b.HasIndex("Id_t")
                        .IsUnique();

                    b.ToTable("pvs");
                });

            modelBuilder.Entity("WebAPI.Model.Transformateur", b =>
                {
                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<string>("Accessoires")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Bornesembrochables")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

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

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

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

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Numero");

                    b.ToTable("transformateurs");
                });

            modelBuilder.Entity("WebAPI.Model.Bobinage", b =>
                {
                    b.HasOne("WebAPI.Model.ControleurDeQualité", "Controleur")
                        .WithMany()
                        .HasForeignKey("ControleurIdC");

                    b.HasOne("WebAPI.Model.Transformateur", "Transformateur")
                        .WithMany("Bobinages")
                        .HasForeignKey("Numero")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Controleur");

                    b.Navigation("Transformateur");
                });

            modelBuilder.Entity("WebAPI.Model.BobinageMT", b =>
                {
                    b.HasOne("WebAPI.Model.Transformateur", "Transformateur")
                        .WithMany("BobinagesMT")
                        .HasForeignKey("Numero")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Transformateur");
                });

            modelBuilder.Entity("WebAPI.Model.Etape", b =>
                {
                    b.HasOne("WebAPI.Model.ControleurDeQualité", "Controleur")
                        .WithMany("Etapes")
                        .HasForeignKey("IdC");

                    b.HasOne("WebAPI.Model.Transformateur", "Transformateur")
                        .WithMany("Etapes")
                        .HasForeignKey("Numero")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Controleur");

                    b.Navigation("Transformateur");
                });

            modelBuilder.Entity("WebAPI.Model.Magnetique", b =>
                {
                    b.HasOne("WebAPI.Model.Transformateur", "Transformateur")
                        .WithMany("Magnetique")
                        .HasForeignKey("Numero")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Transformateur");
                });

            modelBuilder.Entity("WebAPI.Model.Montage", b =>
                {
                    b.HasOne("WebAPI.Model.Transformateur", "Transformateur")
                        .WithMany("Montage")
                        .HasForeignKey("Numero")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Transformateur");
                });

            modelBuilder.Entity("WebAPI.Model.Pv", b =>
                {
                    b.HasOne("WebAPI.Model.ControleurDeQualité", "ControleurDeQualité")
                        .WithMany("Pvs")
                        .HasForeignKey("IdC")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebAPI.Model.Transformateur", null)
                        .WithOne("Pv")
                        .HasForeignKey("WebAPI.Model.Pv", "Id_t")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ControleurDeQualité");
                });

            modelBuilder.Entity("WebAPI.Model.ControleurDeQualité", b =>
                {
                    b.Navigation("Etapes");

                    b.Navigation("Pvs");
                });

            modelBuilder.Entity("WebAPI.Model.Transformateur", b =>
                {
                    b.Navigation("Bobinages");

                    b.Navigation("BobinagesMT");

                    b.Navigation("Etapes");

                    b.Navigation("Magnetique");

                    b.Navigation("Montage");

                    b.Navigation("Pv");
                });
#pragma warning restore 612, 618
        }
    }
}
