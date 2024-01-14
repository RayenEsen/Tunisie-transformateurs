using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Model
{
    public class Transformateur
    {
        [Key]
        public int Numero { get; private set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Marque { get; private set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Client { get; private set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Norme { get; private set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Power { get; private set; } = "";

        public float MT_U1 { get; private set; }
        public float MT_U2 { get; private set; }
        public float BT_U2 { get; private set; }
        public float BT_I2 { get; private set; }
        public int Nb_phase { get; private set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Couplage { get; private set; } = "";

        [Column(TypeName = "nvarchar(100)")]
        public string Cooling { get; private set; } = "";

        public float Frequency { get; private set; }

        // Parameterless constructor for Entity Framework
        protected Transformateur()
        {
        }

        // Constructor for creating instances with required parameters
        public Transformateur(int numero, string marque, string client, string norme, string power,
                              float mtU1, float mtU2, float btU2, float btI2, int nbPhase,
                              string couplage, string cooling, float frequency)
        {
            Numero = numero;
            Marque = marque;
            Client = client;
            Norme = norme;
            Power = power;
            MT_U1 = mtU1;
            MT_U2 = mtU2;
            BT_U2 = btU2;
            BT_I2 = btI2;
            Nb_phase = nbPhase;
            Couplage = couplage;
            Cooling = cooling;
            Frequency = frequency;
        }
    }
}
