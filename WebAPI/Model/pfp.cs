using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Model
{
    public class pfp
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Idpfp { get; set; } // Auto-generated primary key
        [ForeignKey("ControleurDeQualité")]
        public required string IdC { get; set; }
        public string Pathway { get; set; } = "";
        [JsonIgnore]
        public ControleurDeQualité? Controleur { get; set; }
    }
}
