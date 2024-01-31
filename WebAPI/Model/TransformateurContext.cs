﻿using Microsoft.EntityFrameworkCore;
using WebAPI.Model;

namespace WebAPI.Model
{
    public class TransformateurContext : DbContext
    {
        public TransformateurContext(DbContextOptions<TransformateurContext> options) : base(options)
        {

        }

        public DbSet<Transformateur> transformateurs { get; set; }
        public DbSet<Pv> pvs { get; set; }
        public DbSet<ControleurDeQualité> controleurDeQualités { get; set; }
        public DbSet<Etape> etapes { get; set; } // Add Etape DbSet

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure one-to-one relationship between Transformateur and Pv
            modelBuilder.Entity<Transformateur>()
                .HasOne(t => t.Pv)
                .WithOne()
                .HasForeignKey<Pv>(p => p.Id_t);

            // Configure one-to-many relationship between ControleurDeQualité and Pv
            modelBuilder.Entity<ControleurDeQualité>()
                .HasMany(c => c.Pvs)
                .WithOne(p => p.ControleurDeQualité)
                .HasForeignKey(p => p.IdC);

            // Configure many-to-many relationship between ControleurDeQualité and Etape
            modelBuilder.Entity<ControleurDeQualité>()
                .HasMany(c => c.Etapes)
                .WithMany(e => e.Controleurs)
                .UsingEntity(j => j.ToTable("ControleurEtape"));

            // Configure the relationship between Etape and Transformateur
            modelBuilder.Entity<Etape>()
               .HasOne(e => e.Transformateur)
               .WithMany(t => t.Etapes)
               .HasForeignKey(e => e.Numero);

            base.OnModelCreating(modelBuilder);
        }
    }
}
