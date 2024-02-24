using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Model
{
    public class Conseption
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdConseption { get; set; } // Auto-generated primary key
        [ForeignKey("Transformateur")]
        public int Numero { get; set; }
        public string Nom { get; set; } = "";
        public DateOnly? Date { get; set; }
        public int? Quantity { get; set; }
        public int? Quantity2 { get; set; }

        public string Conformiter { get; set; } = "";
        public string Observation { get; set; } = "";

        // Byte array to store the image
        public byte[]? Image { get; set; }

        public ICollection<ConseptionValues>? ConseptionValues { get; set; }

        [JsonIgnore]
        public Transformateur? Transformateur { get; set; }
    }
}
