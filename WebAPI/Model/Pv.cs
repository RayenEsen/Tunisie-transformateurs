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
        public float? Vt11;
        public float? Vt12;
        public float? Vm11;
        public float? Vm12;
        public float? Vm13;
        public float? Vm21;
        public float? Vm22;
        public float? Vm23;
        public float? Vm31;
        public float? Vm32;
        public float? Vm33;
        public float? Vm41;
        public float? Vm42;
        public float? Vm43;
        public float? Vm51;
        public float? Vm52;
        public float? Vm53;
        public Transformateur? Transformateur { get; set; }
    }
}
