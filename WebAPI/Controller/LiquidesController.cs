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
    public class LiquidesController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public LiquidesController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Liquides
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Liquide>>> GetLiquide()
        {
            return await _context.Liquide.ToListAsync();
        }

        // GET: api/Liquides/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Liquide>> GetLiquide(int id)
        {
            var liquide = await _context.Liquide.FindAsync(id);

            if (liquide == null)
            {
                return NotFound();
            }

            return liquide;
        }

        // PUT: api/Liquides/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLiquide(int id, Liquide liquide)
        {
            if (id != liquide.Btid)
            {
                return BadRequest();
            }

            _context.Entry(liquide).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LiquideExists(id))
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

        // POST: api/Liquides
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Liquide>> PostLiquide(Liquide liquide)
        {
            _context.Liquide.Add(liquide);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLiquide", new { id = liquide.Btid }, liquide);
        }

        // DELETE: api/Liquides/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLiquide(int id)
        {
            var liquide = await _context.Liquide.FindAsync(id);
            if (liquide == null)
            {
                return NotFound();
            }

            _context.Liquide.Remove(liquide);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LiquideExists(int id)
        {
            return _context.Liquide.Any(e => e.Btid == id);
        }


        // GET: api/Liquides/ByTransformateur/5
        [HttpGet("ByTransformateur/{numero}")]
        public async Task<ActionResult<IEnumerable<Liquide>>> GetLiquideByTransformateur(int numero)
        {
            var transformateur = await _context.transformateurs.Include(t => t.Liquides).FirstOrDefaultAsync(t => t.Numero == numero);

            if (transformateur == null)
            {
                return NotFound("Transformateur not found");
            }

            if (transformateur.Liquides == null || !transformateur.Liquides.Any())
            {
                // If no liquides exist for this transformateur, create 18 liquides
                var liquides = Enumerable.Range(1, 18).Select(i => new Liquide
                {
                    Numero = numero,
                    A1 = 0, // Set default values for A1, A2, A3, A4, A0
                    A2 = 0,
                    A3 = 0,
                    A4 = 0,
                    A0 = 0
                }).ToList();

                _context.Liquide.AddRange(liquides);
                await _context.SaveChangesAsync();

                return liquides;
            }

            // If liquides already exist for this transformateur, return them
            return transformateur.Liquides.ToList();
        }

        // PUT: api/Liquides/PutLiquides
        [HttpPut("PutLiquides")]
        public async Task<IActionResult> PutLiquides(List<Liquide> liquides)
        {
            try
            {
                foreach (var liquide in liquides)
                {
                    if (!LiquideExists(liquide.Btid))
                    {
                        return NotFound($"Liquide with ID {liquide.Btid} not found");
                    }
                    _context.Entry(liquide).State = EntityState.Modified;
                }

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error updating liquides: {ex.Message}");
            }
        }
    }


}
