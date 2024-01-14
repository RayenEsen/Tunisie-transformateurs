using Microsoft.EntityFrameworkCore;

namespace WebAPI.Model
{
    public class TransformateurContext : DbContext
    {
        public TransformateurContext(DbContextOptions<TransformateurContext> options) : base(options)
        {
        }

        public DbSet<Transformateur> Transformateurs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Transformateur>()
                .HasKey(t => t.Numero); 
        }
    }
}
