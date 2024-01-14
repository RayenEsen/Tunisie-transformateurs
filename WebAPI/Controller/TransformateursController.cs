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
    public class TransformateursController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public TransformateursController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Transformateurs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transformateur>>> GetTransformateurs()
        {
            return await _context.Transformateurs.ToListAsync();
        }

        // GET: api/Transformateurs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transformateur>> GetTransformateur(int id)
        {
            var transformateur = await _context.Transformateurs.FindAsync(id);

            if (transformateur == null)
            {
                return NotFound();
            }

            return transformateur;
        }

        // PUT: api/Transformateurs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransformateur(int id, Transformateur transformateur)
        {
            if (id != transformateur.Numero)
            {
                return BadRequest();
            }

            _context.Entry(transformateur).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransformateurExists(id))
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

        // POST: api/Transformateurs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Transformateur>> PostTransformateur(Transformateur transformateur)
        {
            _context.Transformateurs.Add(transformateur);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransformateur", new { id = transformateur.Numero }, transformateur);
        }

        // DELETE: api/Transformateurs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransformateur(int id)
        {
            var transformateur = await _context.Transformateurs.FindAsync(id);
            if (transformateur == null)
            {
                return NotFound();
            }

            _context.Transformateurs.Remove(transformateur);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransformateurExists(int id)
        {
            return _context.Transformateurs.Any(e => e.Numero == id);
        }
    }
}
