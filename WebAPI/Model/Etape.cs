using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Model
{
    public class Etape
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id_Etape { get; set; } // Auto-generated primary key
        public int EtapeNumero { get; set; }

        [ForeignKey("Transformateur")]
        public int Numero { get; set; }

        public string Nom { get; set; } = "";

        public DateTime? DateDebut { get; set; }
        public DateTime? DateFin { get; set; }

        [JsonIgnore]
        public Transformateur? Transformateur { get; set; }
        public string? Etat { get; set; } = "";
        public string? Observation { get; set; } = "";
        public string? Operateur1 { get; set; } 
        public string? Operateur2 { get; set; }
        public string? Controleur { get; set; }
        public string? Verificateur { get; set; }
    }
}
