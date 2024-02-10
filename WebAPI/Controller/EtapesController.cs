using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;
using WebAPI.Model;

namespace WebAPI.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EtapesController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public EtapesController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Etapes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Etape>>> Getetapes()
        {
            return await _context.etapes.ToListAsync();
        }

        // GET: api/Etapes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Etape>> GetEtape(int id)
        {
            var etape = await _context.etapes.FindAsync(id);

            if (etape == null)
            {
                return NotFound();
            }

            return etape;
        }

        // PUT: api/Etapes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEtape(int id, Etape etape)
        {
            if (id != etape.Id_Etape)
            {
                return BadRequest();
            }

            _context.Entry(etape).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EtapeExists(id))
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

        // POST: api/Etapes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Etape>> PostEtape(Etape etape)
        {
            _context.etapes.Add(etape);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEtape", new { id = etape.Id_Etape }, etape);
        }
        [HttpGet("ByTransformateur/{transformateurId}")]
        public async Task<ActionResult<IEnumerable<Etape>>> GetEtapesByTransformateurId(int transformateurId)
        {
            var etapes = await _context.etapes
                .Include(e => e.Controleurs) // Include the related Controleur entities
                .Where(e => e.Numero == transformateurId)
                .OrderBy(e => e.EtapeNumero) // Order by the 'etapeNumero' property
                .ToListAsync();

            return etapes;
        }



        // DELETE: api/Etapes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEtape(int id)
        {
            var etape = await _context.etapes.FindAsync(id);
            if (etape == null)
            {
                return NotFound();
            }

            _context.etapes.Remove(etape);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPut("UpdateByNumeroAndTransformateur/{numero}/{transformateurId}")]
        public async Task<IActionResult> UpdateControleursByNumeroAndTransformateur(int numero, int transformateurId, Etape updatedEtape)
        {
            var etape = await _context.etapes
                .Include(e => e.Controleurs) // Include the Controleurs related to the Etape
                .Where(e => e.Numero == transformateurId && e.EtapeNumero == numero)
                .FirstOrDefaultAsync();

            if (etape == null)
            {
                return NotFound("Etape not found");
            }
            etape.DateDebut = DateTime.Now;
            etape.Etat = updatedEtape.Etat;
            etape.Observation = updatedEtape.Observation;

            // Clear existing Controleurs
            etape.Controleurs.Clear();

            // Add new Controleurs
            foreach (var controleur in updatedEtape.Controleurs)
            {
                // Find the corresponding ControleurDeQualité object from the database
                var existingControleur = await _context.controleurDeQualités.FindAsync(controleur.IdC);
                if (existingControleur != null)
                {
                    // Add the ControleurDeQualité to the Etape's Controleurs collection
                    etape.Controleurs.Add(existingControleur);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EtapeExists(etape.Id_Etape))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }




        [HttpGet("ByNumeroAndTransformateur/{numero}/{transformateurId}")]
        public async Task<ActionResult<Etape>> GetEtapeByNumeroAndTransformateur(int numero, int transformateurId)
        {
            var etape = await _context.etapes
                .Include(e => e.Controleurs) // Include the controleur data in the query
                .Where(e => e.Numero == transformateurId && e.EtapeNumero == numero)
                .FirstOrDefaultAsync();

            if (etape == null)
            {
                return NotFound("Etape not found");
            }

            return etape;
        }





        private bool EtapeExists(int id)
        {
            return _context.etapes.Any(e => e.Id_Etape == id);
        }
    }
}
