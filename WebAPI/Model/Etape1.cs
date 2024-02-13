using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Model
{
    public class Etape1
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdMagnetique { get; set; } // Auto-generated primary key
        [ForeignKey("Transformateur")]
        public int Numero { get; set; }

        public float? Vp1 { get; set; }
        public float? Cnc1 { get; set; }
        public float? Vp2 { get; set; }
        public float? Cnc2 { get; set; }
        
        [JsonIgnore]
        public Transformateur? Transformateur { get; set; }
    }
}
