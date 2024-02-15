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
    public class RemplissagesController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public RemplissagesController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Remplissages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Remplissage>>> Getremplissages()
        {
            return await _context.remplissages.ToListAsync();
        }

        // GET: api/Remplissages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Remplissage>> GetRemplissage(int id)
        {
            var remplissage = await _context.remplissages.FindAsync(id);

            if (remplissage == null)
            {
                return NotFound();
            }

            return remplissage;
        }

        // PUT: api/Remplissages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRemplissage(int id, Remplissage remplissage)
        {
            if (id != remplissage.IdRemplissage)
            {
                return BadRequest();
            }

            _context.Entry(remplissage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RemplissageExists(id))
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

        // POST: api/Remplissages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Remplissage>> PostRemplissage(Remplissage remplissage)
        {
            _context.remplissages.Add(remplissage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRemplissage", new { id = remplissage.IdRemplissage }, remplissage);
        }

        // DELETE: api/Remplissages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRemplissage(int id)
        {
            var remplissage = await _context.remplissages.FindAsync(id);
            if (remplissage == null)
            {
                return NotFound();
            }

            _context.remplissages.Remove(remplissage);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("ByTransformateur/{transformateurId}")]
        public async Task<ActionResult<IEnumerable<Remplissage>>> GetRemplissagesByTransformateurId(int transformateurId)
        {
            var remplissages = await _context.remplissages
                .Where(r => r.Numero == transformateurId)
                .ToListAsync();

            return Ok(remplissages);
        }

        [HttpPut("UpdateList")]
        public async Task<IActionResult> UpdateRemplissagesList(List<Remplissage> remplissages)
        {
            if (remplissages == null || !remplissages.Any())
            {
                return BadRequest("No remplissages provided for update.");
            }

            foreach (var remplissage in remplissages)
            {
                _context.Entry(remplissage).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Failed to update remplissages due to a concurrency issue.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        private bool RemplissageExists(int id)
        {
            return _context.remplissages.Any(e => e.IdRemplissage == id);
        }
    }
}
