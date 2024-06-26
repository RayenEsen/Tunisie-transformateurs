﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Model
{
    public class Transformateur
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Numero { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Marque { get; set; } = "";
        public DateTime Date { get; set; } = DateTime.Now; // Initialize with current date
        public DateTime DateLivraison { get; set; }
        public DateTime DateFin { get; set; }
        public DateTime Dateprevue { get; set; }
        public DateTime DateCloture { get; set; }

        public string Type { get; set; } = "";

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
        public int Quantite { get; set; } = 1;
        public int Quantite2 { get; set; } = 1;
        public int Commande { get; set; } = 1;


        [Column(TypeName = "nvarchar(100)")]
        public string Prises { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Couplage { get; set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Cooling { get; set; } = "";
        [Column(TypeName = "nvarchar(100)")]
        public string Libelle { get; set; } = "";
        public string Accessoires { get; set; } = "";
        public string Accessoires2 { get; set; } = "";
        public string Etat { get; set; } = "";
        public string Galet { get; set; } = "";
        public string Capot { get; set; } = "";
        public string Sans { get; set; } = "";
        public string Borne { get; set; } = "";
        public string Isolateur { get; set; } = "";
        public float Perte_totale { get; set; } 
        public float R1BT { get; set; }
        public float R1MT { get; set; }
        public float Temperature { get; set; }
        public string Bornesembrochables { get; set; } = "";
        public float Frequency { get; set; }
        //Navigation property
        public Pv? Pv { get; set; }
        public ICollection<Etape>? Etapes { get; set; }

        public ICollection<Bobinage>? Bobinages { get; set; }
        public ICollection<BobinageMT>? BobinagesMT { get; set; }
        public ICollection<Magnetique>? Magnetique { get; set; }
        public ICollection<Montage>? Montage { get; set; }
        public ICollection<Electrique>? Electriques { get; set; }
        public ICollection<Etape1>? Etapes1 { get; set; }
        public ICollection<Ecuvage>? Ecuvage { get; set; }
        public ICollection<EcuvageValues>? EcuvageValues { get; set; }

        public ICollection<Remplissage>? Remplissage { get; set; }
        public ICollection<Peinture>? Peinture { get; set; }
        public ICollection<Conseption>? Conseption { get; set; }
        public ICollection<EchauffementBT>? EchauffementBTs { get; set; }
        public ICollection<Liquide>? Liquides { get; set; }

    }
}
