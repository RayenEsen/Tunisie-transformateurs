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

            // Get the updated list of transformateurs after deletion
            var updatedTransformateurs = await _context.transformateurs.ToListAsync();

            // Return the updated list
            return Ok(updatedTransformateurs);
        }


        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<Transformateur>>> SearchTransformateurs([FromQuery] string searchTerm)
        {
            // Perform a search based on the searchTerm
            var result = await _context.transformateurs
                .Include(t => t.Pv)
                .Include(t => t.Pv.ControleurDeQualite)
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
                    t.Pv.ControleurDeQualite.Username.Contains(searchTerm) ||
                    t.Numero.ToString().Contains(searchTerm))
                .ToListAsync();

            return result;
        }

        [HttpGet("Filter")]
        public async Task<ActionResult<IEnumerable<Transformateur>>> FilterTransformateurs(
    [FromQuery] string choix1,
    [FromQuery] string choix2)
        {
            IQueryable<Transformateur> query = _context.transformateurs.Include(t => t.Pv);

            // Apply filtering and sorting based on the specified conditions
            switch (choix1)
            {
                case "DL": // Date de lancement (Transformateur Date)
                    switch (choix2)
                    {
                        case "A": // Ascending
                            query = query.OrderBy(t => t.Date);
                            break;
                        case "D": // Descending
                            query = query.OrderByDescending(t => t.Date);
                            break;
                        default:
                            return BadRequest("Invalid sort order. Use 'A' for Ascending or 'D' for Descending.");
                    }
                    break;
                case "DE": // Date d'essai (Pv Date)
                    switch (choix2)
                    {
                        case "A": // Ascending
                            query = query.OrderBy(t => t.Pv.Date);
                            break;
                        case "D": // Descending
                            query = query.OrderByDescending(t => t.Pv.Date);
                            break;
                        default:
                            return BadRequest("Invalid sort order. Use 'A' for Ascending or 'D' for Descending.");
                    }
                    break;
                default:
                    return BadRequest("Invalid filter type. Use 'DL' for Date de lancement or 'DE' for Date d'essai.");
            }

            var result = await query.ToListAsync();

            return result;
        }

        [HttpDelete("DeleteList")]
        public async Task<IActionResult> DeleteTransformateursList(List<int> ids)
        {
            // Find the transformateurs in the list of IDs
            var transformateurs = await _context.transformateurs.Where(t => ids.Contains(t.Numero)).ToListAsync();

            if (transformateurs == null || transformateurs.Count == 0)
            {
                return NotFound();
            }

            _context.transformateurs.RemoveRange(transformateurs);
            await _context.SaveChangesAsync();

            // Return the deleted transformateurs
            return Ok(transformateurs);
        }



        private bool TransformateurExists(int id)
        {
            return _context.transformateurs.Any(e => e.Numero == id);
        }
    }
}
 