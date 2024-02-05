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
    public class MontagesController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public MontagesController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Montages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Montage>>> Getmontages()
        {
            return await _context.montages.ToListAsync();
        }

        // GET: api/Montages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Montage>> GetMontage(int id)
        {
            var montage = await _context.montages.FindAsync(id);

            if (montage == null)
            {
                return NotFound();
            }

            return montage;
        }

        // PUT: api/Montages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMontage(int id, Montage montage)
        {
            if (id != montage.IdMagnetique)
            {
                return BadRequest();
            }

            _context.Entry(montage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MontageExists(id))
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

        // POST: api/Montages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Montage>> PostMontage(Montage montage)
        {
            _context.montages.Add(montage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMontage", new { id = montage.IdMagnetique }, montage);
        }

        // DELETE: api/Montages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMontage(int id)
        {
            var montage = await _context.montages.FindAsync(id);
            if (montage == null)
            {
                return NotFound();
            }

            _context.montages.Remove(montage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("ByTransformateur/{transformateurId}")]
        public async Task<ActionResult<IEnumerable<Montage>>> GetMontagesByTransformateurId(int transformateurId)
        {
            var montages = await _context.montages
                .Where(m => m.Numero == transformateurId)
                .ToListAsync();

            return Ok(montages);
        }

        [HttpPut("UpdateList")]
        public async Task<IActionResult> UpdateMontageList(List<Montage> montages)
        {
            if (montages == null || !montages.Any())
            {
                return BadRequest("No montages provided for update.");
            }

            foreach (var montage in montages)
            {
                _context.Entry(montage).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Failed to update montages due to a concurrency issue.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }


        private bool MontageExists(int id)
        {
            return _context.montages.Any(e => e.IdMagnetique == id);
        }
    }
}
