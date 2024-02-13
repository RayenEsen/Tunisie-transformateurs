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
    public class ElectriquesController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public ElectriquesController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Electriques
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Electrique>>> GetElectrique()
        {
            return await _context.Electrique.ToListAsync();
        }

        // GET: api/Electriques/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Electrique>> GetElectrique(int id)
        {
            var electrique = await _context.Electrique.FindAsync(id);

            if (electrique == null)
            {
                return NotFound();
            }

            return electrique;
        }

        // PUT: api/Electriques/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutElectrique(int id, Electrique electrique)
        {
            if (id != electrique.IdMagnetique)
            {
                return BadRequest();
            }

            _context.Entry(electrique).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ElectriqueExists(id))
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

        // POST: api/Electriques
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Electrique>> PostElectrique(Electrique electrique)
        {
            _context.Electrique.Add(electrique);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetElectrique", new { id = electrique.IdMagnetique }, electrique);
        }

        // DELETE: api/Electriques/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteElectrique(int id)
        {
            var electrique = await _context.Electrique.FindAsync(id);
            if (electrique == null)
            {
                return NotFound();
            }

            _context.Electrique.Remove(electrique);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // GET: api/Electriques/ByTransformateur/5
        [HttpGet("ByTransformateur/{transformateurId}")]
        public async Task<ActionResult<IEnumerable<Electrique>>> GetElectriquesByTransformateur(int transformateurId)
        {
            var electriques = await _context.Electrique
                .Where(e => e.Numero == transformateurId)
                .ToListAsync();

            if (!electriques.Any())
            {
                return NotFound();
            }

            return electriques;
        }
        // PUT: api/Electriques/UpdateList
        [HttpPut("UpdateList")]
        public async Task<IActionResult> UpdateListElectrique(List<Electrique> electriques)
        {
            foreach (var electrique in electriques)
            {
                // Update each Electrique entity in the database
                _context.Entry(electrique).State = EntityState.Modified;
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

        private bool ElectriqueExists(int id)
        {
            return _context.Electrique.Any(e => e.IdMagnetique == id);
        }
    }
}
