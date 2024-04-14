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
    public class EchauffementBTsController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public EchauffementBTsController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/EchauffementBTs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EchauffementBT>>> GetEchauffementBTs()
        {
            return await _context.EchauffementBTs.ToListAsync();
        }

        // GET: api/EchauffementBTs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EchauffementBT>> GetEchauffementBT(int id)
        {
            var echauffementBT = await _context.EchauffementBTs.FindAsync(id);

            if (echauffementBT == null)
            {
                return NotFound();
            }

            return echauffementBT;
        }

        // PUT: api/EchauffementBTs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEchauffementBT(int id, EchauffementBT echauffementBT)
        {
            if (id != echauffementBT.Btid)
            {
                return BadRequest();
            }

            _context.Entry(echauffementBT).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EchauffementBTExists(id))
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

        // POST: api/EchauffementBTs
        // To protect from overpostinga attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EchauffementBT>> PostEchauffementBT(EchauffementBT echauffementBT)
        {
            _context.EchauffementBTs.Add(echauffementBT);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEchauffementBT", new { id = echauffementBT.Btid }, echauffementBT);
        }

        // DELETE: api/EchauffementBTs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEchauffementBT(int id)
        {
            var echauffementBT = await _context.EchauffementBTs.FindAsync(id);
            if (echauffementBT == null)
            {
                return NotFound();
            }

            _context.EchauffementBTs.Remove(echauffementBT);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EchauffementBTExists(int id)
        {
            return _context.EchauffementBTs.Any(e => e.Btid == id);
        }

        // POST: api/EchauffementBTs/CheckOrCreate
        [HttpPost("CheckOrCreate")]
        public async Task<ActionResult<IEnumerable<EchauffementBT>>> CheckOrCreateEchauffement(int transformateurNumero, string type)
        {
            // Check if there are any echauffements with the provided transformateurNumero and type
            var matchingEchauffements = await _context.EchauffementBTs
                                                .Where(e => e.Numero == transformateurNumero && e.Type == type)
                                                .ToListAsync();

            if (matchingEchauffements.Count < 81)
            {
                // Calculate how many echauffements to create
                int echauffementsToCreate = 81 - matchingEchauffements.Count;

                // Create and add new echauffements to the context
                for (int i = 0; i < echauffementsToCreate; i++)
                {
                    var newEchauffement = new EchauffementBT { Numero = transformateurNumero, Type = type };
                    _context.EchauffementBTs.Add(newEchauffement);
                }

                // Save changes to the database
                await _context.SaveChangesAsync();
            }

            // Return the echauffements, whether they were newly created or already existed
            return await _context.EchauffementBTs
                                .Where(e => e.Numero == transformateurNumero && e.Type == type)
                                .ToListAsync();
        }



        // POST: api/EchauffementBTs/UpdateEchauffement
        [HttpPost("UpdateEchauffement")]
        public async Task<IActionResult> UpdateEchauffement(List<EchauffementBT> echauffements)
        {
            foreach (var echauffement in echauffements)
            {
                _context.Entry(echauffement).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "An error occurred while saving changes.");
            }

            return NoContent();
        }



    }
}
