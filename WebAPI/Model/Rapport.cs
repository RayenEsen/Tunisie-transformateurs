using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebAPI.Model
{
    public class Rapport
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdRapport { get; set; } // Auto-generated primary key

        [ForeignKey("Etape")]

        public int Id_Etape { get; set; }

        public DateTime Dater { get; set; }

        public string Origine { get; set; } = "";

        public string Description { get; set; } = "";

        public string Analyse { get; set; } = "";

        public string Action { get; set; } = "";

        public string Responsable { get; set;  } = "";

        public string Delais { get; set; } = "";

        public string Etat { get; set; } = "";

        public string Efficacite { get; set; } = "";

        public Etape? Etape { get; set; }
    }
}
