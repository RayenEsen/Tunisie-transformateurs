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

        // GET: api/Conseptions/Transformateur/{transformateurId}
        [HttpGet("Transformateur/{transformateurId}")]
        public async Task<ActionResult<IEnumerable<Conseption>>> GetConseptionsByTransformateur(int transformateurId)
        {
            var controleurs = await _context.Conseptions
                .Where(c => c.Numero == transformateurId) // Filter by transformateurId
                .Include(c => c.ConseptionValues) // Include related ConseptionValues
                .ToListAsync();

            if (controleurs == null || !controleurs.Any())
            {
                return NotFound();
            }

            return controleurs;
        }


        private bool ConseptionExists(int id)
        {
            return _context.Conseptions.Any(e => e.IdConseption == id);
        }
    }
}
