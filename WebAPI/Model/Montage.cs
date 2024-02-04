using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Model
{
    public class Montage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdMagnetique { get; set; } // Auto-generated primary key
        [ForeignKey("Transformateur")]
        public int Numero { get; set; }
        public int? c1m { get; set; }
        public int? c1p { get; set; }
        public int? c2m { get; set; }
        public int? c2p { get; set; }
        public int? c3m { get; set; }
        public int? c3p { get; set; }
        public string Nom { get; set; } = "";
        [JsonIgnore]
        public Transformateur? Transformateur { get; set; }
    }
}
