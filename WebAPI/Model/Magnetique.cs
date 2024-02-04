using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Model
{
    public class Magnetique
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdMagnetique { get; set; } // Auto-generated primary key
        [ForeignKey("Transformateur")]
        public int Numero { get; set; }
        public int? F1c1m { get; set; }
        public int? F1c1p { get; set; }
        public int? F2c2m { get; set; }
        public int? F2c2p { get; set; }
        public int? F3c3m { get; set; }
        public int? F3c3p { get; set; }
        public int? C4m { get; set; }
        public int? C4p { get; set; }
        public string Nom { get; set; } = "";

        [JsonIgnore]
        public Transformateur? Transformateur { get; set; }
    }
}
