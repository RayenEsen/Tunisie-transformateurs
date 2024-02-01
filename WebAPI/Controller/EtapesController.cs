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
                .Include(e => e.Controleurs) // Include Controleurs
                .Where(e => e.Numero == transformateurId)
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

        [HttpPut("UpdateTransformateur/{transformateurId}/{etapeNumero}")]
        public async Task<IActionResult> UpdateTransformateur(int transformateurId, int etapeNumero, [FromBody] Etape updatedEtape)
        {
            try
            {
                // Check if the provided IDs match the model
                if (transformateurId != updatedEtape.Numero || etapeNumero != updatedEtape.EtapeNumero)
                {
                    return BadRequest("IDs do not match the provided Etape");
                }

                // Retrieve the existing Etape with Controleurs
                var existingEtape = await _context.etapes
                    .Include(e => e.Controleurs)
                    .FirstOrDefaultAsync(e => e.Numero == transformateurId && e.EtapeNumero == etapeNumero);

                // Check if the Etape exists
                if (existingEtape == null)
                {
                    return NotFound("Etape not found");
                }

                // Update other properties of the existing Etape
                existingEtape.Nom = updatedEtape.Nom;
                existingEtape.DateDebut = updatedEtape.DateDebut;
                existingEtape.DateFin = updatedEtape.DateFin;

                // Clear existing Controleurs (assuming that you want to replace the existing ones)
                existingEtape.Controleurs.Clear();

                // Update the Controleurs collection
                if (updatedEtape.Controleurs != null && updatedEtape.Controleurs.Any())
                {
                    // Assuming that Controleur objects have unique IDs
                    var existingControleurs = await _context.controleurDeQualités
                        .Where(c => updatedEtape.Controleurs.Select(cc => cc.IdC).Contains(c.IdC))
                        .ToListAsync();

                    existingEtape.Controleurs.AddRange(existingControleurs);
                }

                // Update the database
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to update Etape: {ex.Message}");
            }
        }



        private bool EtapeExists(int id)
        {
            return _context.etapes.Any(e => e.Id_Etape == id);
        }
    }
}
