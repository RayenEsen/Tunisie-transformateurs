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
    public class ConseptionsController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public ConseptionsController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Conseptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Conseption>>> GetConseptions()
        {
            return await _context.Conseptions.ToListAsync();
        }

        // GET: api/Conseptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Conseption>> GetConseption(int id)
        {
            var conseption = await _context.Conseptions.FindAsync(id);

            if (conseption == null)
            {
                return NotFound();
            }

            return conseption;
        }

        // PUT: api/Conseptions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConseption(int id, Conseption conseption)
        {
            if (id != conseption.IdConseption)
            {
                return BadRequest();
            }

            _context.Entry(conseption).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConseptionExists(id))
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

        // POST: api/Conseptions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Conseption>> PostConseption(Conseption conseption)
        {
            _context.Conseptions.Add(conseption);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConseption", new { id = conseption.IdConseption }, conseption);
        }

        // DELETE: api/Conseptions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConseption(int id)
        {
            var conseption = await _context.Conseptions.FindAsync(id);
            if (conseption == null)
            {
                return NotFound();
            }

            _context.Conseptions.Remove(conseption);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // OBTENIR : api/Conseptions/Transformateur/{transformateurId}
        [HttpGet("Transformateur/{transformateurId}")]
        public async Task<ActionResult<IEnumerable<Conseption>>> GetConseptionsByTransformateur(int transformateurId)
        {
            var controleurs = await _context.Conseptions
                .Where(c => c.Numero == transformateurId) // Filtrer par transformateurId
                .Include(c => c.ConseptionValues) // Inclure les ConseptionValues associés
                .OrderBy(c => c.IdConseption) // Ordonner par Id, du plus petit au plus grand
                .ToListAsync();

            if (controleurs == null || !controleurs.Any())
            {
                return NotFound();
            }

            return controleurs;
        }

        [HttpPut("UpdateConseption/Transformateur/{transformateurId}")]
        public async Task<IActionResult> UpdateConseption(int transformateurId, List<Conseption> updatedConseptions)
        {
            foreach (var updatedConseption in updatedConseptions)
            {
                var id = updatedConseption.IdConseption;
                if (id != updatedConseption.IdConseption || updatedConseption.Numero != transformateurId)
                {
                    return BadRequest();
                }

                var existingConseption = await _context.Conseptions
                                                        .Include(c => c.ConseptionValues) // Include related entities
                                                        .FirstOrDefaultAsync(c => c.IdConseption == id && c.Numero == transformateurId);

                if (existingConseption == null)
                {
                    return NotFound();
                }

                // Update properties of existing Conseption entity
                existingConseption.Nom = updatedConseption.Nom;
                existingConseption.Date = updatedConseption.Date;
                existingConseption.Quantity = updatedConseption.Quantity;
                existingConseption.Quantity2 = updatedConseption.Quantity2;
                existingConseption.Observation = updatedConseption.Observation;

                existingConseption.Conformiter = updatedConseption.Conformiter;

                // Handle image data
                if (updatedConseption.Image != null && updatedConseption.Image.Length > 0)
                {
                    existingConseption.Image = updatedConseption.Image;
                }

                // Update related ConseptionValues
                foreach (var updatedValue in updatedConseption.ConseptionValues)
                {
                    var existingValue = existingConseption.ConseptionValues.FirstOrDefault(cv => cv.ValueId == updatedValue.ValueId);
                    if (existingValue != null)
                    {
                        existingValue.Nom = updatedValue.Nom;
                        existingValue.Prevue = updatedValue.Prevue;
                        existingValue.Mesuree = updatedValue.Mesuree;
                    }
                    else
                    {
                        // Handle addition of new ConseptionValue if necessary
                        // For example:
                        // existingConseption.ConseptionValues.Add(updatedValue);
                    }
                }

                try
                {
                    // Save changes to the database
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    // Handle concurrency exception
                    return StatusCode(StatusCodes.Status500InternalServerError, "Database operation failed. Please try again.");
                }
            }

            return NoContent();
        }




        private bool ConseptionExists(int id)
        {
            return _context.Conseptions.Any(e => e.IdConseption == id);
        }
    }
}
