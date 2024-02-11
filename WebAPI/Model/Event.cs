using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Model
{
    public class Event
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Ide { get; set; } // Auto-generated primary key
        [ForeignKey("ControleurDeQualité")]
        public string IdC { get; set; } = ""; // Foreign key  
        public string Eventname { get; set; } = "";
        public string EventDetails { get; set; } = "";
        public DateTime EventDate { get; set; }
        public ControleurDeQualité? ControleurDeQualité { get; set; }
    }
}
