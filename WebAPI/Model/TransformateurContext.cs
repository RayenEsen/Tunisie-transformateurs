using Microsoft.EntityFrameworkCore;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure one-to-one relationship between Transformateur and Pv
            modelBuilder.Entity<Transformateur>()
                .HasOne(t => t.Pv)
                .WithOne(p => p.Transformateur)
                .HasForeignKey<Pv>(p => p.Id_t);

            // Configure one-to-many relationship between ControleurDeQualité and Pv
            modelBuilder.Entity<ControleurDeQualité>()
                .HasMany(c => c.Pvs)
                .WithOne(p => p.ControleurDeQualité)
                .HasForeignKey(p => p.Id_C);

            // Add other configurations for your model

            base.OnModelCreating(modelBuilder);
        }
    }
}
