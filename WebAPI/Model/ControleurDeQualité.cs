using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebAPI.Model
{
    public class ControleurDeQualité
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string IdC { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Nom { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Prenom { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string? Username { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Email { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Tel { get; set; } = "";

        [Column(TypeName = "date")]
        public DateTime? Birthdate { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? Department { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string? Designation { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string? Adresse { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string? Region { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string? CodePostal { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Password { get; set; } = "";

        // Collection navigation property for Pv
        [JsonIgnore]
        public ICollection<Pv>? Pvs { get; set; }
        [JsonIgnore]
        public ICollection<Etape>? Etapes { get; set; }
    }
}
