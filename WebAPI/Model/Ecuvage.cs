using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace WebAPI.Model
{
    public class Ecuvage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdMagnetique { get; set; } // Auto-generated primary key
        [ForeignKey("Transformateur")]
        public int Numero { get; set; }
        public string? Conformite { get; set; }
        public string? Observation { get; set; }

        [JsonIgnore]
        public Transformateur? Transformateur { get; set; }
    }
}
