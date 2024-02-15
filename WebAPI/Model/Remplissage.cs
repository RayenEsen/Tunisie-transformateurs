using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Model
{
    public class Remplissage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdRemplissage { get; set; } // Auto-generated primary key
        [ForeignKey("Transformateur")]
        public int Numero { get; set; }
        public DateOnly? Datet { get; set; }
        public float? Pressiond { get; set; }
        public float? Pressionf { get; set; }
        public float? Hd { get; set; }
        public float? Hf { get; set; }
        public float? Cnc { get; set; }
        public string? Controleur { get; set; }
        public string? Observations { get; set; }
        [JsonIgnore]
        public Transformateur? Transformateur { get; set; }
    }
}
