using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Model;

namespace WebAPI.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransformateursController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public TransformateursController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Transformateurs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transformateur>>> Gettransformateurs()
        {
            return await _context.transformateurs.ToListAsync();
        }

        [HttpGet("AllTransformateursWithPv")]
        public async Task<ActionResult<IEnumerable<Transformateur>>> GetAllTransformateursWithPv()
        {
                // Include the Pv navigation property in the query
                var transformateursWithPvs = await _context.transformateurs.Include(t => t.Pv).ToListAsync();

                return transformateursWithPvs;
        }

        // GET: api/Transformateurs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transformateur>> GetTransformateur(int id)
        {
            var transformateur = await _context.transformateurs.FindAsync(id);

            if (transformateur == null)
            {
                return NotFound();
            }

            return transformateur;
        }

        // PUT: api/Transformateurs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransformateur(int id, Transformateur transformateur)
        {
            if (id != transformateur.Numero)
            {
                return BadRequest();
            }

            _context.Entry(transformateur).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransformateurExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Transformateurs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Transformateur>> PostTransformateur(Transformateur transformateur)
        {
            _context.transformateurs.Add(transformateur);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TransformateurExists(transformateur.Numero))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTransformateur", new { id = transformateur.Numero }, transformateur);
        }

        // DELETE: api/Transformateurs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransformateur(int id)
        {
            var transformateur = await _context.transformateurs.FindAsync(id);
            if (transformateur == null)
            {
                return NotFound();
            }

            _context.transformateurs.Remove(transformateur);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<Transformateur>>> SearchTransformateurs([FromQuery] string searchTerm)
        {
            // Perform a search based on the searchTerm
            var result = await _context.transformateurs
                .Include(t => t.Pv)
                .Include(t => t.Pv.ControleurDeQualité)
                .Where(t =>
                    t.Marque.Contains(searchTerm) ||
                    t.Client.Contains(searchTerm) ||
                    t.Norme.Contains(searchTerm) ||
                    t.Power.Contains(searchTerm) ||
                    t.Prises.Contains(searchTerm) ||
                    t.Couplage.Contains(searchTerm) ||
                    t.Cooling.Contains(searchTerm) ||
                    t.Libelle.Contains(searchTerm) ||
                    t.Type.Contains(searchTerm) ||
                    t.Pv.Resultat.Contains(searchTerm) ||
                    t.Pv.ControleurDeQualité.Username.Contains(searchTerm) ||
                    t.Numero.ToString().Contains(searchTerm))
                .ToListAsync();

            return result;
        }


        private bool TransformateurExists(int id)
        {
            return _context.transformateurs.Any(e => e.Numero == id);
        }
    }
}
