using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Model
{
    public class Pv
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id_pv { get; set; } // Auto-generated primary key
        [ForeignKey("Transformateur")]
        public int Id_t { get; set; } // Foreign key
        public DateTime Date { get; set; } = DateTime.Now; // Initialize with current date
        public string? Resultat { get; set; } // Result property
        public Transformateur? Transformateur { get; set; }
    }
}
