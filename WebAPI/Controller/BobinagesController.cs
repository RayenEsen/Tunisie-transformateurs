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
    public class BobinagesController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public BobinagesController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Bobinages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bobinage>>> GetBobinage()
        {
            return await _context.Bobinage.ToListAsync();
        }

        // GET: api/Bobinages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bobinage>> GetBobinage(int id)
        {
            var bobinage = await _context.Bobinage.FindAsync(id);

            if (bobinage == null)
            {
                return NotFound();
            }

            return bobinage;
        }

        // PUT: api/Bobinages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBobinage(int id, Bobinage bobinage)
        {
            if (id != bobinage.IdBobinage)
            {
                return BadRequest();
            }

            _context.Entry(bobinage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BobinageExists(id))
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

        // POST: api/Bobinages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Bobinage>> PostBobinage(Bobinage bobinage)
        {
            _context.Bobinage.Add(bobinage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBobinage", new { id = bobinage.IdBobinage }, bobinage);
        }

        // DELETE: api/Bobinages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBobinage(int id)
        {
            var bobinage = await _context.Bobinage.FindAsync(id);
            if (bobinage == null)
            {
                return NotFound();
            }

            _context.Bobinage.Remove(bobinage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("ByTransformateur/{transformateurId}")]
        public async Task<ActionResult<IEnumerable<Bobinage>>> GetBobinagesByTransformateurId(int transformateurId)
        {
            var bobinages = await _context.Bobinage
                .Where(b => b.Numero == transformateurId)
                .ToListAsync();

            return bobinages;
        }

        // PUT: api/Bobinages/UpdateList
        [HttpPut("UpdateList")]
        public async Task<IActionResult> UpdateBobinageList(List<Bobinage> bobinages)
        {
            foreach (var bobinage in bobinages)
            {
                _context.Entry(bobinage).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Handle concurrency exception if needed
                throw;
            }

            return NoContent();
        }


        private bool BobinageExists(int id)
        {
            return _context.Bobinage.Any(e => e.IdBobinage == id);
        }
    }
}
