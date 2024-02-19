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
    public class PeinturesController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public PeinturesController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Peintures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Peinture>>> Getpeintures()
        {
            return await _context.peintures.ToListAsync();
        }

        // GET: api/Peintures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Peinture>> GetPeinture(int id)
        {
            var peinture = await _context.peintures.FindAsync(id);

            if (peinture == null)
            {
                return NotFound();
            }

            return peinture;
        }

        // PUT: api/Peintures/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPeinture(int id, Peinture peinture)
        {
            if (id != peinture.IdPeinture)
            {
                return BadRequest();
            }

            _context.Entry(peinture).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PeintureExists(id))
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

        // POST: api/Peintures
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Peinture>> PostPeinture(Peinture peinture)
        {
            _context.peintures.Add(peinture);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPeinture", new { id = peinture.IdPeinture }, peinture);
        }

        // DELETE: api/Peintures/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePeinture(int id)
        {
            var peinture = await _context.peintures.FindAsync(id);
            if (peinture == null)
            {
                return NotFound();
            }

            _context.peintures.Remove(peinture);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PeintureExists(int id)
        {
            return _context.peintures.Any(e => e.IdPeinture == id);
        }
    }
}
