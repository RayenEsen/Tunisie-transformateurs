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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure one-to-one relationship
            modelBuilder.Entity<Transformateur>()
                .HasOne(t => t.Pv)
                .WithOne(p => p.Transformateur)
                .HasForeignKey<Pv>(p => p.Id_t); // Assuming Id_T is the foreign key in Pv referencing Transformateur

            base.OnModelCreating(modelBuilder);
        }
    }
}
