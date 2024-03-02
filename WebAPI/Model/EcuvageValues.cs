using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace WebAPI.Model
{
    public class EcuvageValues
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdEcuvageValues { get; set; } // Auto-generated primary key
        [ForeignKey("Transformateur")]
        public int Numero { get; set; }

        public int? V1 { get; set; }
        public int? V2 { get; set; }
        public int? V3 { get; set; }
        public int? V4 { get; set; }
        public int? V5 { get; set; }
        public int? V6 { get; set; }
        public int? V7 { get; set; }
        public int? V8 { get; set; }
        public int? V9 { get; set; }

        [JsonIgnore]
        public Transformateur? Transformateur { get; set; }
    }
}
