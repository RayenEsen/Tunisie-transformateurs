using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Model
{
    public class Transformateur
    {
        [Key]
        private int _numero;
        [Column]
        private string _marque = "";
        private string _client = "";
        private string _norme = "";
        private string _power = "";
        private float _mtU1;
        private float _mtI1;
        private float _btU2;
        private float _btI2;
        private int _nbPhase;
        private string _prises = "";
        private string _couplage = "";
        private string _cooling = "";
        private float _frequency;

        public int Numero
        {
            get { return _numero; }
            set { _numero = value; }
        }

        public string Marque
        {
            get { return _marque; }
            set { _marque = value; }
        }

        public string Client
        {
            get { return _client; }
            set { _client = value; }
        }

        public string Norme
        {
            get { return _norme; }
            set { _norme = value; }
        }

        public string Power
        {
            get { return _power; }
            set { _power = value; }
        }

        public float MT_U1
        {
            get { return _mtU1; }
            set { _mtU1 = value; }
        }

        public float MT_I1
        {
            get { return _mtI1; }
            set { _mtI1 = value; }
        }

        public float BT_U2
        {
            get { return _btU2; }
            set { _btU2 = value; }
        }

        public float BT_I2
        {
            get { return _btI2; }
            set { _btI2 = value; }
        }

        public int Nb_Phase
        {
            get { return _nbPhase; }
            set { _nbPhase = value; }
        }

        public string Prises
        {
            get { return _prises; }
            set { _prises = value; }
        }

        public string Couplage
        {
            get { return _couplage; }
            set { _couplage = value; }
        }

        public string Cooling
        {
            get { return _cooling; }
            set { _cooling = value; }
        }

        public float Frequency
        {
            get { return _frequency; }
            set { _frequency = value; }
        }
    }
}
