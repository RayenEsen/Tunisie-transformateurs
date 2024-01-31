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
    public class EtapesController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public EtapesController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Etapes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Etape>>> Getetapes()
        {
            return await _context.etapes.ToListAsync();
        }

        // GET: api/Etapes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Etape>> GetEtape(int id)
        {
            var etape = await _context.etapes.FindAsync(id);

            if (etape == null)
            {
                return NotFound();
            }

            return etape;
        }

        // PUT: api/Etapes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEtape(int id, Etape etape)
        {
            if (id != etape.Id_E)
            {
                return BadRequest();
            }

            _context.Entry(etape).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EtapeExists(id))
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

        // POST: api/Etapes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Etape>> PostEtape(Etape etape)
        {
            _context.etapes.Add(etape);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EtapeExists(etape.Id_E))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEtape", new { id = etape.Id_E }, etape);
        }

        // DELETE: api/Etapes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEtape(int id)
        {
            var etape = await _context.etapes.FindAsync(id);
            if (etape == null)
            {
                return NotFound();
            }

            _context.etapes.Remove(etape);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("ByTransformateur/{transformateurId}")]
        public async Task<ActionResult<IEnumerable<Etape>>> GetEtapesByTransformateur(int transformateurId)
        {
            var etapes = await _context.etapes
                                        .Where(e => e.Numero == transformateurId)
                                        .ToListAsync();

            if (etapes == null || etapes.Count == 0)
            {
                return NotFound("No Etapes found for the specified Transformateur id.");
            }

            return etapes;
        }
        private bool EtapeExists(int id)
        {
            return _context.etapes.Any(e => e.Id_E == id);
        }
    }
}
