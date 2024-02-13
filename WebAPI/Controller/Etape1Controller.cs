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
    public class Etape1Controller : ControllerBase
    {
        private readonly TransformateurContext _context;

        public Etape1Controller(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Etape1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Etape1>>> GetEtape1()
        {
            return await _context.Etape1.ToListAsync();
        }

        // GET: api/Etape1/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Etape1>> GetEtape1(int id)
        {
            var etape1 = await _context.Etape1.FindAsync(id);

            if (etape1 == null)
            {
                return NotFound();
            }

            return etape1;
        }

        // PUT: api/Etape1/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEtape1(int id, Etape1 etape1)
        {
            if (id != etape1.IdMagnetique)
            {
                return BadRequest();
            }

            _context.Entry(etape1).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Etape1Exists(id))
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

        // POST: api/Etape1
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Etape1>> PostEtape1(Etape1 etape1)
        {
            _context.Etape1.Add(etape1);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEtape1", new { id = etape1.IdMagnetique }, etape1);
        }

        // DELETE: api/Etape1/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEtape1(int id)
        {
            var etape1 = await _context.Etape1.FindAsync(id);
            if (etape1 == null)
            {
                return NotFound();
            }

            _context.Etape1.Remove(etape1);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // GET: api/Etape1/ByTransformateur/5
        [HttpGet("ByTransformateur/{transformateurId}")]
        public async Task<ActionResult<IEnumerable<Etape1>>> GetEtapesByTransformateur(int transformateurId)
        {
            var etapes = await _context.Etape1
                .Where(e => e.Numero == transformateurId)
                .ToListAsync();

            if (etapes == null || !etapes.Any())
            {
                return NotFound();
            }

            return etapes;
        }
        // PUT: api/Etape1/UpdateList
        [HttpPut("UpdateList")]
        public async Task<IActionResult> UpdateListEtape1(List<Etape1> etapes)
        {
            foreach (var etape in etapes)
            {
                // Update each Etape1 entity in the database
                _context.Entry(etape).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Handle concurrency exception if necessary
                throw;
            }

            return NoContent();
        }

        private bool Etape1Exists(int id)
        {
            return _context.Etape1.Any(e => e.IdMagnetique == id);
        }
    }
}
