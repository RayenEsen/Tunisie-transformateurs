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
    public class BobinageMTsController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public BobinageMTsController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/BobinageMTs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BobinageMT>>> GetbobinageMTs()
        {
            return await _context.bobinageMTs.ToListAsync();
        }

        // GET: api/BobinageMTs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BobinageMT>> GetBobinageMT(int id)
        {
            var bobinageMT = await _context.bobinageMTs.FindAsync(id);

            if (bobinageMT == null)
            {
                return NotFound();
            }

            return bobinageMT;
        }

        // PUT: api/BobinageMTs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBobinageMT(int id, BobinageMT bobinageMT)
        {
            if (id != bobinageMT.IdBobinageMT)
            {
                return BadRequest();
            }

            _context.Entry(bobinageMT).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BobinageMTExists(id))
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

        // POST: api/BobinageMTs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BobinageMT>> PostBobinageMT(BobinageMT bobinageMT)
        {
            _context.bobinageMTs.Add(bobinageMT);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBobinageMT", new { id = bobinageMT.IdBobinageMT }, bobinageMT);
        }

        // DELETE: api/BobinageMTs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBobinageMT(int id)
        {
            var bobinageMT = await _context.bobinageMTs.FindAsync(id);
            if (bobinageMT == null)
            {
                return NotFound();
            }

            _context.bobinageMTs.Remove(bobinageMT);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("ByTransformateur/{transformateurId}")]
        public async Task<ActionResult<IEnumerable<BobinageMT>>> GetBobinagesByTransformateurId(int transformateurId)
        {
            var bobinages = await _context.bobinageMTs
                .Where(b => b.Numero == transformateurId)
                .ToListAsync();

            return Ok(bobinages);
        }
        [HttpPut("UpdateList")]
        public async Task<IActionResult> UpdateBobinageList(List<BobinageMT> bobinages)
        {
            if (bobinages == null || !bobinages.Any())
            {
                return BadRequest("No bobinages provided for update.");
            }

            foreach (var bobinage in bobinages)
            {
                _context.Entry(bobinage).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Failed to update bobinages due to a concurrency issue.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        private bool BobinageMTExists(int id)
        {
            return _context.bobinageMTs.Any(e => e.IdBobinageMT == id);
        }
    }
}
