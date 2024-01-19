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
    public class PvsController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public PvsController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Pvs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pv>>> Getpvs()
        {
            return await _context.pvs.ToListAsync();
        }

        // GET: api/Pvs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Pv>> GetPv(int id)
        {
            var pv = await _context.pvs.FindAsync(id);

            if (pv == null)
            {
                return NotFound();
            }

            return pv;
        }

        // PUT: api/Pvs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPv(int id, Pv pv)
        {
            if (id != pv.Id_pv)
            {
                return BadRequest();
            }

            _context.Entry(pv).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PvExists(id))
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

        // POST: api/Pvs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Pv>> PostPv(Pv pv)
        {
            _context.pvs.Add(pv);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPv", new { id = pv.Id_pv }, pv);
        }

        // DELETE: api/Pvs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePv(int id)
        {
            var pv = await _context.pvs.FindAsync(id);
            if (pv == null)
            {
                return NotFound();
            }

            _context.pvs.Remove(pv);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PvExists(int id)
        {
            return _context.pvs.Any(e => e.Id_pv == id);
        }
    }
}
