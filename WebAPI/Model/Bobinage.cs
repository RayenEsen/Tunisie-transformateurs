using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Model
{
    public class Bobinage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdBobinage { get; set; } // Auto-generated primary key
        [ForeignKey("Transformateur")]
        public int Numero { get; set; }


        public float? Bt1 { get; set; }
        public float? Bt2 { get; set; }
        public float? Bt3 { get; set; }

        public float? Prevue { get; set; }
        public string? Cnc { get; set; }
        public string Nom { get; set; } = "";


        [JsonIgnore]
        public Transformateur? Transformateur { get; set; }

    }
}
