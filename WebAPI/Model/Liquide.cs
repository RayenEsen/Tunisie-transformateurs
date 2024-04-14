using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace WebAPI.Model
{
    public class Liquide
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Btid { get; set; }
        [ForeignKey("Transformateur")]
        public int Numero { get; set; }

        public float A1 { get; set; }
        public float A2 { get; set; }
        public float A3 { get; set; }
        public float A4 { get; set; }
        public float A0 { get; set; }

        public float Resultat { get; set; }

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
