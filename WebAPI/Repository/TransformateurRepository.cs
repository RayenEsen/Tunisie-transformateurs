using WebAPI.Interface;
using WebAPI.Model;

namespace WebAPI.Repository
{
    public class TransformateurRepository : TransformateurInterface
    {
        private readonly TransformateurContext context;

        public TransformateurRepository(TransformateurContext context)
        {
            this.context = context;
        }
        public ICollection<Transformateur> GetTransformateurs()
        {
            return this.context.Transformateurs.ToList();  
        }
    }
}
