using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Model
{
    public class Electrique
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdMagnetique { get; set; } // Auto-generated primary key
        [ForeignKey("Transformateur")]
        public int Numero { get; set; }
        public float? P1 { get; set; }
        public float? P2 { get; set; }
        public float? P3 { get; set; }
        public float? P4 { get; set; }
        public float? P5 { get; set; }
        public float? Cnc { get; set; }
        [JsonIgnore]
        public Transformateur? Transformateur { get; set; }
    }
}
