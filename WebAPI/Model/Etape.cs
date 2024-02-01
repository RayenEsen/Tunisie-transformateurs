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
        public ICollection<ControleurDeQualité>? Controleurs { get; set; }
        [JsonIgnore]
        public Transformateur? Transformateur { get; set; }
    }
}
