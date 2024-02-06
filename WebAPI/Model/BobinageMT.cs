using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Model
{
    public class BobinageMT
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdBobinageMT { get; set; } // Auto-generated primary key
        [ForeignKey("Transformateur")]
        public int Numero { get; set; }
        public int? Bt1 { get; set; }
        public int? Bt2 { get; set; }
        public int? Bt3 { get; set; }

        public int? Prevue { get; set; }
        public int? Cnc { get; set; }
        public string Nom { get; set; } = "";
        [JsonIgnore]
        public Transformateur? Transformateur { get; set; }
    }
}
