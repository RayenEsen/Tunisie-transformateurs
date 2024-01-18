﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Model
{
    public class Transformateur
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)] // Specify that Numero is not auto-generated by the database
        public int Numero { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Marque { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Client { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Norme { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Power { get; set; } = "";

        public float Mtu1 { get; set; }
        public float Mtu2 { get; set; }
        public float Btu2 { get; set; }
        public float Bti2 { get; set; }
        public int Nbphase { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Prises { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Couplage { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Cooling { get; set; } = "";

        public float Frequency { get; set; }

        //Navigation property
        public Pv? Pv { get; set; }
    }
}
