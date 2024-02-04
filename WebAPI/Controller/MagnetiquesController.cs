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
    public class MagnetiquesController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public MagnetiquesController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Magnetiques
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Magnetique>>> Getmagnetiques()
        {
            return await _context.magnetiques.ToListAsync();
        }

        // GET: api/Magnetiques/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Magnetique>> GetMagnetique(int id)
        {
            var magnetique = await _context.magnetiques.FindAsync(id);

            if (magnetique == null)
            {
                return NotFound();
            }

            return magnetique;
        }

        // PUT: api/Magnetiques/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMagnetique(int id, Magnetique magnetique)
        {
            if (id != magnetique.IdMagnetique)
            {
                return BadRequest();
            }

            _context.Entry(magnetique).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MagnetiqueExists(id))
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

        // POST: api/Magnetiques
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Magnetique>> PostMagnetique(Magnetique magnetique)
        {
            _context.magnetiques.Add(magnetique);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMagnetique", new { id = magnetique.IdMagnetique }, magnetique);
        }

        // DELETE: api/Magnetiques/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMagnetique(int id)
        {
            var magnetique = await _context.magnetiques.FindAsync(id);
            if (magnetique == null)
            {
                return NotFound();
            }

            _context.magnetiques.Remove(magnetique);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("ByTransformateur/{transformateurId}")]
        public async Task<ActionResult<IEnumerable<Magnetique>>> GetMagnetiquesByTransformateurId(int transformateurId)
        {
            var magnetiques = await _context.magnetiques
                .Where(m => m.Numero == transformateurId)
                .ToListAsync();

            return Ok(magnetiques);
        }

        [HttpPut("UpdateList")]
        public async Task<IActionResult> UpdateMagnetiqueList(List<Magnetique> magnetiques)
        {
            if (magnetiques == null || !magnetiques.Any())
            {
                return BadRequest("No magnetiques provided for update.");
            }

            foreach (var magnetique in magnetiques)
            {
                _context.Entry(magnetique).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Failed to update magnetiques due to a concurrency issue.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        private bool MagnetiqueExists(int id)
        {
            return _context.magnetiques.Any(e => e.IdMagnetique == id);
        }
    }
}
