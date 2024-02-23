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
    public class ConseptionValuesController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public ConseptionValuesController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/ConseptionValues
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConseptionValues>>> GetConseptionValues()
        {
            return await _context.ConseptionValues.ToListAsync();
        }

        // GET: api/ConseptionValues/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ConseptionValues>> GetConseptionValues(int id)
        {
            var conseptionValues = await _context.ConseptionValues.FindAsync(id);

            if (conseptionValues == null)
            {
                return NotFound();
            }

            return conseptionValues;
        }

        // PUT: api/ConseptionValues/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConseptionValues(int id, ConseptionValues conseptionValues)
        {
            if (id != conseptionValues.ValueId)
            {
                return BadRequest();
            }

            _context.Entry(conseptionValues).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConseptionValuesExists(id))
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

        // POST: api/ConseptionValues
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ConseptionValues>> PostConseptionValues(ConseptionValues conseptionValues)
        {
            _context.ConseptionValues.Add(conseptionValues);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConseptionValues", new { id = conseptionValues.ValueId }, conseptionValues);
        }

        // DELETE: api/ConseptionValues/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConseptionValues(int id)
        {
            var conseptionValues = await _context.ConseptionValues.FindAsync(id);
            if (conseptionValues == null)
            {
                return NotFound();
            }

            _context.ConseptionValues.Remove(conseptionValues);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ConseptionValuesExists(int id)
        {
            return _context.ConseptionValues.Any(e => e.ValueId == id);
        }
    }
}
