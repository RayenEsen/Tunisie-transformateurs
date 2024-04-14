using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Model
{
    public class EchauffementBT
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Btid { get; set; }
        [ForeignKey("Transformateur")]
        public int Numero { get; set; }
        public float Temp { get; set; }
        public float U { get; set; }


        public float Rshunt { get; set; }
        public float Ushunt { get; set; }

        public float Resultat { get; set; }
        public string Type { get; set; } = "";


        public string Controleur1 { get; set; } = "";
        public string Verificateur { get; set; } = "";
        public string Visa { get; set; } = "";
        public DateTime Date { get; set; }
        public string? Conclusion { get; set; } = "En Attente";
        public float Vl { get; set; }
        [JsonIgnore]
        public Transformateur? Transformateur { get; set; }
    }
}
