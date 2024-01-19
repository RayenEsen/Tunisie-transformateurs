using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Model
{
    public class Pv
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id_pv { get; set; } // Auto-generated primary key
        [ForeignKey("Transformateur")]
        public int Id_t { get; set; } // Foreign key
        public DateTime Date { get; set; } = DateTime.Now; // Initialize with current date
        public string? Resultat { get; set; } // Result property
        //Voltage Ratio Data
        public int? tappings;
        public float? Vt11 { get; set; }
        public float? Vt12 { get; set; }
        public float? Vt21 { get; set; }
        public float? Vt22 { get; set; }
        public float? Vt31 { get; set; }
        public float? Vt32 { get; set; }
        public float? Vt41 { get; set; }
        public float? Vt42 { get; set; }
        public float? Vt51 { get; set; }
        public float? Vt52 { get; set; }
        public float? Vm11 { get; set; }
        public float? Vm12 { get; set; }
        public float? Vm13 { get; set; }
        public float? Vm21 { get; set; }
        public float? Vm22 { get; set; }
        public float? Vm23 { get; set; }
        public float? Vm31 { get; set; }
        public float? Vm32 { get; set; }
        public float? Vm33 { get; set; }
        public float? Vm41 { get; set; }
        public float? Vm42 { get; set; }
        public float? Vm43 { get; set; }
        public float? Vm51 { get; set; }
        public float? Vm52 { get; set; }
        public float? Vm53 { get; set; }
        public Transformateur? Transformateur { get; set; }
    }
}
