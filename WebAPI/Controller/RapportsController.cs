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
    public class RapportsController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public RapportsController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Rapports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rapport>>> GetRapports()
        {
            return await _context.Rapports.ToListAsync();
        }

        // GET: api/Rapports/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rapport>> GetRapport(int id)
        {
            var rapport = await _context.Rapports.FindAsync(id);

            if (rapport == null)
            {
                return NotFound();
            }

            return rapport;
        }

        // PUT: api/Rapports/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRapport(int id, Rapport rapport)
        {
            if (id != rapport.IdRapport)
            {
                return BadRequest();
            }

            _context.Entry(rapport).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RapportExists(id))
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

        // POST: api/Rapports
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Rapport>> PostRapport(Rapport rapport)
        {
            _context.Rapports.Add(rapport);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRapport", new { id = rapport.IdRapport }, rapport);
        }

        // DELETE: api/Rapports/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRapport(int id)
        {
            var rapport = await _context.Rapports.FindAsync(id);
            if (rapport == null)
            {
                return NotFound();
            }

            _context.Rapports.Remove(rapport);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RapportExists(int id)
        {
            return _context.Rapports.Any(e => e.IdRapport == id);
        }

        // GET: api/Rapports/ExistsByEtapeId/5
        [HttpGet("ExistsByEtapeId/{id}")]
        public async Task<ActionResult<bool>> RapportExistsByEtapeId(int id)
        {
            var rapportExists = await _context.Rapports.AnyAsync(r => r.Etape.Id_Etape == id);

            return rapportExists;
        }
        // GET: api/Rapports/ByEtapeId/5
        [HttpGet("ByEtapeId/{id}")]
        public async Task<ActionResult<Rapport>> GetRapportByEtapeId(int id)
        {
            var rapport = await _context.Rapports
                                        .Include(r => r.Etape) // Assuming "Etape" is a navigation property in your Rapport model
                                        .FirstOrDefaultAsync(r => r.Etape.Id_Etape == id);

            if (rapport == null)
            {
                return NotFound();
            }

            return rapport;
        }

        // PUT: api/Rapports/UpsertRapport
        [HttpPut("UpsertRapport")]
        public async Task<IActionResult> UpsertRapport(Rapport rapport)
        {
            var existingRapport = await _context.Rapports.FindAsync(rapport.IdRapport);

            if (existingRapport == null)
            {
                // The rapport does not exist, so add it
                _context.Rapports.Add(rapport);
            }
            else
            {
                // The rapport exists, so update it
                _context.Entry(existingRapport).CurrentValues.SetValues(rapport);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RapportExists(rapport.IdRapport))
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



    }
}
