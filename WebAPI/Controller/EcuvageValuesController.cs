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
    public class EcuvageValuesController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public EcuvageValuesController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/EcuvageValues
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EcuvageValues>>> GetEcuvageValues()
        {
            return await _context.EcuvageValues.ToListAsync();
        }

        // GET: api/EcuvageValues/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EcuvageValues>> GetEcuvageValues(int id)
        {
            var ecuvageValues = await _context.EcuvageValues.FindAsync(id);

            if (ecuvageValues == null)
            {
                return NotFound();
            }

            return ecuvageValues;
        }

        // PUT: api/EcuvageValues/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEcuvageValues(int id, EcuvageValues ecuvageValues)
        {
            if (id != ecuvageValues.IdEcuvageValues)
            {
                return BadRequest();
            }

            _context.Entry(ecuvageValues).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EcuvageValuesExists(id))
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

        // POST: api/EcuvageValues
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EcuvageValues>> PostEcuvageValues(EcuvageValues ecuvageValues)
        {
            _context.EcuvageValues.Add(ecuvageValues);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEcuvageValues", new { id = ecuvageValues.IdEcuvageValues }, ecuvageValues);
        }

        // DELETE: api/EcuvageValues/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEcuvageValues(int id)
        {
            var ecuvageValues = await _context.EcuvageValues.FindAsync(id);
            if (ecuvageValues == null)
            {
                return NotFound();
            }

            _context.EcuvageValues.Remove(ecuvageValues);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("ByTransformateur/{transformateurId}")]
        public async Task<ActionResult<IEnumerable<BobinageMT>>> GetEcuvageValuesByTransformateurId(int transformateurId)
        {
            var ecuvagevalues = await _context.EcuvageValues
                .Where(b => b.Numero == transformateurId)
                .ToListAsync();

            return Ok(ecuvagevalues);
        }
        // PUT: api/EcuvageValues/UpdateByTransformateurId/{transformateurId}/{ecuvageValuesId}
        [HttpPut("UpdateByTransformateurId/{transformateurId}/{ecuvageValuesId}")]
        public async Task<IActionResult> UpdateEcuvageValuesByTransformateurId(int transformateurId, int ecuvageValuesId, EcuvageValues ecuvageValues)
        {
            // Check if the provided IDs are valid
            if (transformateurId != ecuvageValues.Numero || ecuvageValuesId != ecuvageValues.IdEcuvageValues)
            {
                return BadRequest();
            }

            // Find the specified ecuvageValues record
            var existingEcuvageValues = await _context.EcuvageValues.FindAsync(ecuvageValuesId);
            if (existingEcuvageValues == null)
            {
                return NotFound();
            }

            // Update the existing ecuvageValues record with the new values
            existingEcuvageValues.V1 = ecuvageValues.V1;
            existingEcuvageValues.V2 = ecuvageValues.V2;
            existingEcuvageValues.V3 = ecuvageValues.V3;
            existingEcuvageValues.V4 = ecuvageValues.V4;
            existingEcuvageValues.V5 = ecuvageValues.V5;
            existingEcuvageValues.V6 = ecuvageValues.V6;
            existingEcuvageValues.V7 = ecuvageValues.V7;
            existingEcuvageValues.V8 = ecuvageValues.V8;
            existingEcuvageValues.V9 = ecuvageValues.V9;
            // Set the state of the entity as modified
            _context.Entry(existingEcuvageValues).State = EntityState.Modified;

            try
            {
                // Save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EcuvageValuesExists(ecuvageValuesId))
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

        private bool EcuvageValuesExists(int id)
        {
            return _context.EcuvageValues.Any(e => e.IdEcuvageValues == id);
        }
    }
}
