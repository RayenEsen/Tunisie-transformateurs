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
    [Migration("20240225101132_tfyfd")]
    partial class tfyfd
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ControleurDeQualitéEtape", b =>
                {
                    b.Property<string>("ControleursIdC")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("EtapesId_Etape")
                        .HasColumnType("int");

                    b.HasKey("ControleursIdC", "EtapesId_Etape");

                    b.HasIndex("EtapesId_Etape");

                    b.ToTable("ControleurDeQualitéEtape");
                });

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

            modelBuilder.Entity("WebAPI.Model.Conseption", b =>
                {
                    b.Property<int>("IdConseption")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdConseption"));

                    b.Property<string>("Conformiter")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly?>("Date")
                        .HasColumnType("date");

                    b.Property<DateTime>("Date2")
                        .HasColumnType("datetime2");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<string>("Observation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.Property<int?>("Quantity2")
                        .HasColumnType("int");

                    b.HasKey("IdConseption");

                    b.HasIndex("Numero");

                    b.ToTable("Conseptions");
                });

            modelBuilder.Entity("WebAPI.Model.ConseptionValues", b =>
                {
                    b.Property<int>("ValueId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ValueId"));

                    b.Property<int>("IdConseption")
                        .HasColumnType("int");

                    b.Property<float?>("Mesuree")
                        .HasColumnType("real");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float?>("Prevue")
                        .HasColumnType("real");

                    b.HasKey("ValueId");

                    b.HasIndex("IdConseption");

                    b.ToTable("ConseptionValues");
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

            modelBuilder.Entity("WebAPI.Model.Ecuvage", b =>
                {
                    b.Property<int>("IdMagnetique")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdMagnetique"));

                    b.Property<string>("Conformite")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<string>("Observation")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdMagnetique");

                    b.HasIndex("Numero");

                    b.ToTable("ecuvages");
                });

            modelBuilder.Entity("WebAPI.Model.Electrique", b =>
                {
                    b.Property<int>("IdMagnetique")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdMagnetique"));

                    b.Property<float?>("Cnc")
                        .HasColumnType("real");

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<float?>("P1")
                        .HasColumnType("real");

                    b.Property<float?>("P2")
                        .HasColumnType("real");

                    b.Property<float?>("P3")
                        .HasColumnType("real");

                    b.Property<float?>("P4")
                        .HasColumnType("real");

                    b.Property<float?>("P5")
                        .HasColumnType("real");

                    b.HasKey("IdMagnetique");

                    b.HasIndex("Numero");

                    b.ToTable("Electrique");
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

                    b.Property<string>("Etat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<string>("Observation")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id_Etape");

                    b.HasIndex("Numero");

                    b.ToTable("etapes");
                });

            modelBuilder.Entity("WebAPI.Model.Etape1", b =>
                {
                    b.Property<int>("IdMagnetique")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdMagnetique"));

                    b.Property<float?>("Cnc1")
                        .HasColumnType("real");

                    b.Property<float?>("Cnc2")
                        .HasColumnType("real");

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<float?>("Vp1")
                        .HasColumnType("real");

                    b.Property<float?>("Vp2")
                        .HasColumnType("real");

                    b.HasKey("IdMagnetique");

                    b.HasIndex("Numero");

                    b.ToTable("Etape1");
                });

            modelBuilder.Entity("WebAPI.Model.Event", b =>
                {
                    b.Property<int>("Ide")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Ide"));

                    b.Property<DateTime>("EventDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("EventDetails")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Eventname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdC")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Ide");

                    b.HasIndex("IdC");

                    b.ToTable("events");
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

            modelBuilder.Entity("WebAPI.Model.Peinture", b =>
                {
                    b.Property<int>("IdPeinture")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdPeinture"));

                    b.Property<string>("Cnc")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Commut")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Cosse")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly?>("DatePentiure")
                        .HasColumnType("date");

                    b.Property<string>("Doigt")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fuite")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Isolateur")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Marquage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Neutre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<int>("Numerop")
                        .HasColumnType("int");

                    b.Property<string>("Observation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Penture")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Relais")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Signature")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Soupage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Terre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Vanne")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdPeinture");

                    b.HasIndex("Numero");

                    b.ToTable("peintures");
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

                    b.Property<string>("Technique")
                        .HasColumnType("nvarchar(max)");

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

            modelBuilder.Entity("WebAPI.Model.Remplissage", b =>
                {
                    b.Property<int>("IdRemplissage")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdRemplissage"));

                    b.Property<float?>("Cnc")
                        .HasColumnType("real");

                    b.Property<string>("Controleur")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly?>("Datet")
                        .HasColumnType("date");

                    b.Property<float?>("Hd")
                        .HasColumnType("real");

                    b.Property<float?>("Hf")
                        .HasColumnType("real");

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<string>("Observations")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float?>("Pressiond")
                        .HasColumnType("real");

                    b.Property<float?>("Pressionf")
                        .HasColumnType("real");

                    b.HasKey("IdRemplissage");

                    b.HasIndex("Numero");

                    b.ToTable("remplissages");
                });

            modelBuilder.Entity("WebAPI.Model.Transformateur", b =>
                {
                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<string>("Accessoires")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Accessoires2")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Bornesembrochables")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Bti2")
                        .HasColumnType("real");

                    b.Property<float>("Btu2")
                        .HasColumnType("real");

                    b.Property<string>("Capot")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

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

                    b.Property<string>("Etat")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Frequency")
                        .HasColumnType("real");

                    b.Property<string>("Galet")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

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

                    b.Property<string>("Sans")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Numero");

                    b.ToTable("transformateurs");
                });

            modelBuilder.Entity("WebAPI.Model.pfp", b =>
                {
                    b.Property<int>("Idpfp")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Idpfp"));

                    b.Property<string>("IdC")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Pathway")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Idpfp");

                    b.HasIndex("IdC")
                        .IsUnique();

                    b.ToTable("pfps");
                });

            modelBuilder.Entity("ControleurDeQualitéEtape", b =>
                {
                    b.HasOne("WebAPI.Model.ControleurDeQualité", null)
                        .WithMany()
                        .HasForeignKey("ControleursIdC")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebAPI.Model.Etape", null)
                        .WithMany()
                        .HasForeignKey("EtapesId_Etape")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
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

            modelBuilder.Entity("WebAPI.Model.Conseption", b =>
                {
                    b.HasOne("WebAPI.Model.Transformateur", "Transformateur")
                        .WithMany("Conseption")
                        .HasForeignKey("Numero")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Transformateur");
                });

            modelBuilder.Entity("WebAPI.Model.ConseptionValues", b =>
                {
                    b.HasOne("WebAPI.Model.Conseption", "Conseption")
                        .WithMany("ConseptionValues")
                        .HasForeignKey("IdConseption")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Conseption");
                });

            modelBuilder.Entity("WebAPI.Model.Ecuvage", b =>
                {
                    b.HasOne("WebAPI.Model.Transformateur", "Transformateur")
                        .WithMany("Ecuvage")
                        .HasForeignKey("Numero")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Transformateur");
                });

            modelBuilder.Entity("WebAPI.Model.Electrique", b =>
                {
                    b.HasOne("WebAPI.Model.Transformateur", "Transformateur")
                        .WithMany("Electriques")
                        .HasForeignKey("Numero")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Transformateur");
                });

            modelBuilder.Entity("WebAPI.Model.Etape", b =>
                {
                    b.HasOne("WebAPI.Model.Transformateur", "Transformateur")
                        .WithMany("Etapes")
                        .HasForeignKey("Numero")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Transformateur");
                });

            modelBuilder.Entity("WebAPI.Model.Etape1", b =>
                {
                    b.HasOne("WebAPI.Model.Transformateur", "Transformateur")
                        .WithMany("Etapes1")
                        .HasForeignKey("Numero")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Transformateur");
                });

            modelBuilder.Entity("WebAPI.Model.Event", b =>
                {
                    b.HasOne("WebAPI.Model.ControleurDeQualité", "ControleurDeQualité")
                        .WithMany("Event")
                        .HasForeignKey("IdC")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ControleurDeQualité");
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

            modelBuilder.Entity("WebAPI.Model.Peinture", b =>
                {
                    b.HasOne("WebAPI.Model.Transformateur", "Transformateur")
                        .WithMany("Peinture")
                        .HasForeignKey("Numero")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Transformateur");
                });

            modelBuilder.Entity("WebAPI.Model.Pv", b =>
                {
                    b.HasOne("WebAPI.Model.ControleurDeQualité", "ControleurDeQualite")
                        .WithMany("Pvs")
                        .HasForeignKey("IdC")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebAPI.Model.Transformateur", null)
                        .WithOne("Pv")
                        .HasForeignKey("WebAPI.Model.Pv", "Id_t")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ControleurDeQualite");
                });

            modelBuilder.Entity("WebAPI.Model.Remplissage", b =>
                {
                    b.HasOne("WebAPI.Model.Transformateur", "Transformateur")
                        .WithMany("Remplissage")
                        .HasForeignKey("Numero")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Transformateur");
                });

            modelBuilder.Entity("WebAPI.Model.pfp", b =>
                {
                    b.HasOne("WebAPI.Model.ControleurDeQualité", "Controleur")
                        .WithOne("Pfp")
                        .HasForeignKey("WebAPI.Model.pfp", "IdC")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Controleur");
                });

            modelBuilder.Entity("WebAPI.Model.Conseption", b =>
                {
                    b.Navigation("ConseptionValues");
                });

            modelBuilder.Entity("WebAPI.Model.ControleurDeQualité", b =>
                {
                    b.Navigation("Event");

                    b.Navigation("Pfp");

                    b.Navigation("Pvs");
                });

            modelBuilder.Entity("WebAPI.Model.Transformateur", b =>
                {
                    b.Navigation("Bobinages");

                    b.Navigation("BobinagesMT");

                    b.Navigation("Conseption");

                    b.Navigation("Ecuvage");

                    b.Navigation("Electriques");

                    b.Navigation("Etapes");

                    b.Navigation("Etapes1");

                    b.Navigation("Magnetique");

                    b.Navigation("Montage");

                    b.Navigation("Peinture");

                    b.Navigation("Pv");

                    b.Navigation("Remplissage");
                });
#pragma warning restore 612, 618
        }
    }
}
