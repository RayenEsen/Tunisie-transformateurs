using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace WebAPI.Model
{
    public class Peinture
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdPeinture { get; set; } // Auto-generated primary key
        [ForeignKey("Transformateur")]
        public int Numerop { get; set; }
        public int Numero { get; set; }
        public DateOnly? DatePentiure { get; set; }
        public string? Fuite { get; set; }
        public string? Penture { get; set; }
        public string? Isolateur { get; set; }
        public string? Marquage { get; set; }
        public string? Neutre { get; set; }
        public string? Terre { get; set; }
        public string? Commut { get; set; }
        public string? Soupage { get; set; }
        public string? Signature { get; set; }
        public string? Vanne { get; set; }
        public string? Relais { get; set; }
        public string? Doigt { get; set; }
        public string? Cosse { get; set; }
        public string? Observation { get; set; }
        public string? Cnc { get; set; }

        [JsonIgnore]
        public Transformateur? Transformateur { get; set; }
    }
}
