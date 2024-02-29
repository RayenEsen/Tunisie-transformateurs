using Microsoft.EntityFrameworkCore;
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
        public DbSet<Etape> etapes { get; set; }
        public DbSet<Bobinage> bobinages { get; set; }
        public DbSet<BobinageMT> bobinageMTs { get; set; }
        public DbSet<Magnetique> magnetiques { get; set; }
        public DbSet<Montage> montages { get; set; }
        public DbSet<Event> events { get; set; }
        public DbSet<Etape1> etape1s { get; set; }
        public DbSet<Ecuvage> ecuvages { get; set; }
        public DbSet<Remplissage> remplissages { get; set; }
        public DbSet<Peinture> peintures { get; set; }
        public DbSet<pfp> pfps { get; set; }
        public DbSet<Conseption> Conseptions { get; set; }
        public DbSet<ConseptionValues> ConseptionValues { get; set; }
        public DbSet<OperateurSuggestions> OperateurSuggestions { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure one-to-one relationship between Transformateur and Pv
            modelBuilder.Entity<Transformateur>()
                .HasOne(t => t.Pv)
                .WithOne()
                .HasForeignKey<Pv>(p => p.Id_t);

            // Configure one-to-one relationship between ControleurDeQualité and pfp
            modelBuilder.Entity<ControleurDeQualité>()
                .HasOne(c => c.Pfp)            // ControleurDeQualité has one Pfp
                .WithOne(p => p.Controleur)     // Pfp has one ControleurDeQualité
                .HasForeignKey<pfp>(p => p.IdC); // Use IdC as the foreign key in pfp

            // Configure one-to-many relationship between ControleurDeQualité and Pv
            modelBuilder.Entity<ControleurDeQualité>()
                .HasMany(c => c.Pvs)
                .WithOne(p => p.ControleurDeQualite)
                .HasForeignKey(p => p.IdC);

            modelBuilder.Entity<Conseption>()
                .HasMany(c => c.ConseptionValues)
                .WithOne(cv => cv.Conseption)
                .HasForeignKey(cv => cv.IdConseption);

            // Configure the relationship between Etape and Transformateur
            modelBuilder.Entity<Etape>()
               .HasOne(e => e.Transformateur)
               .WithMany(t => t.Etapes)
               .HasForeignKey(e => e.Numero);

            modelBuilder.Entity<Bobinage>()
            .HasOne(b => b.Transformateur)
            .WithMany(t => t.Bobinages)
            .HasForeignKey(b => b.Numero);

            modelBuilder.Entity<BobinageMT>()
            .HasOne(b => b.Transformateur)
            .WithMany(t => t.BobinagesMT)
            .HasForeignKey(b => b.Numero);


            modelBuilder.Entity<Magnetique>()
            .HasOne(b => b.Transformateur)
            .WithMany(t => t.Magnetique)
            .HasForeignKey(b => b.Numero);

            modelBuilder.Entity<Montage>()
            .HasOne(b => b.Transformateur)
            .WithMany(t => t.Montage)
            .HasForeignKey(b => b.Numero);

            // Configure the one-to-many relationship between ControleurDeQualité and Event
            modelBuilder.Entity<ControleurDeQualité>()
                .HasMany(c => c.Event) // A ControleurDeQualité can have many events
                .WithOne(e => e.ControleurDeQualité) // An Event belongs to one ControleurDeQualité
                .HasForeignKey(e => e.IdC); // Foreign key relationship

            modelBuilder.Entity<Electrique>()
                .HasOne(e => e.Transformateur)
                .WithMany(t => t.Electriques)
                .HasForeignKey(e => e.Numero)
                .IsRequired();

            modelBuilder.Entity<Etape1>()
                .HasOne(e => e.Transformateur)
                .WithMany(t => t.Etapes1)
                .HasForeignKey(e => e.Numero)
                .IsRequired();

            modelBuilder.Entity<Ecuvage>()
                .HasOne(e => e.Transformateur)
                .WithMany(t => t.Ecuvage)
                .HasForeignKey(e => e.Numero)
                .IsRequired();

            modelBuilder.Entity<Remplissage>()
                .HasOne(e => e.Transformateur)
                .WithMany(t => t.Remplissage)
                .HasForeignKey(e => e.Numero)
                .IsRequired();

            modelBuilder.Entity<Peinture>()
                .HasOne(e => e.Transformateur)
                .WithMany(t => t.Peinture)
                .HasForeignKey(e => e.Numero)
                .IsRequired();

            modelBuilder.Entity<Conseption>()
                .HasOne(c => c.Transformateur)
                .WithMany(t => t.Conseption)
                .HasForeignKey(c => c.Numero)
                .IsRequired();

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<WebAPI.Model.Bobinage> Bobinage { get; set; } = default!;
        public DbSet<WebAPI.Model.Electrique> Electrique { get; set; } = default!;
        public DbSet<WebAPI.Model.Etape1> Etape1 { get; set; } = default!;
    }
}
