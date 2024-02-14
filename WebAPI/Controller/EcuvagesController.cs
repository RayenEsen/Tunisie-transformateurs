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
    public class EcuvagesController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public EcuvagesController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Ecuvages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ecuvage>>> Getecuvages()
        {
            return await _context.ecuvages.ToListAsync();
        }

        // GET: api/Ecuvages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ecuvage>> GetEcuvage(int id)
        {
            var ecuvage = await _context.ecuvages.FindAsync(id);

            if (ecuvage == null)
            {
                return NotFound();
            }

            return ecuvage;
        }

        // PUT: api/Ecuvages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEcuvage(int id, Ecuvage ecuvage)
        {
            if (id != ecuvage.IdMagnetique)
            {
                return BadRequest();
            }

            _context.Entry(ecuvage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EcuvageExists(id))
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

        // POST: api/Ecuvages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ecuvage>> PostEcuvage(Ecuvage ecuvage)
        {
            _context.ecuvages.Add(ecuvage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEcuvage", new { id = ecuvage.IdMagnetique }, ecuvage);
        }

        // DELETE: api/Ecuvages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEcuvage(int id)
        {
            var ecuvage = await _context.ecuvages.FindAsync(id);
            if (ecuvage == null)
            {
                return NotFound();
            }

            _context.ecuvages.Remove(ecuvage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Ecuvages/ByTransformateur/5
        [HttpGet("ByTransformateur/{transformateurId}")]
        public async Task<ActionResult<IEnumerable<Ecuvage>>> GetEcuvagesByTransformateur(int transformateurId)
        {
            var ecuvages = await _context.ecuvages
                .Where(e => e.Numero == transformateurId)
                .ToListAsync();

            if (!ecuvages.Any())
            {
                return NotFound();
            }

            return ecuvages;
        }
        // PUT: api/Ecuvages/UpdateList
        [HttpPut("UpdateList")]
        public async Task<IActionResult> UpdateListEcuvage(List<Ecuvage> ecuvages)
        {
            foreach (var ecuvage in ecuvages)
            {
                // Update each Ecuvage entity in the database
                _context.Entry(ecuvage).State = EntityState.Modified;
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


        private bool EcuvageExists(int id)
        {
            return _context.ecuvages.Any(e => e.IdMagnetique == id);
        }
    }
}
