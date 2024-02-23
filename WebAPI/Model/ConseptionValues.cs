using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Model
{
    public class ConseptionValues
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ValueId { get; set; } // Auto-generated primary key
        [ForeignKey("Conseption")]
        public int IdConseption { get; set; }
        public string Nom { get; set; } = "";
        public float? Prevue { get; set; }
        public float? Mesuree { get; set; }
        [JsonIgnore]
        public Conseption? Conseption { get; set; }
    }
}
