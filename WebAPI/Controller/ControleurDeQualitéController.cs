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
    public class ControleurDeQualitéController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public ControleurDeQualitéController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/ControleurDeQualité
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ControleurDeQualité>>> GetcontroleurDeQualités()
        {
            // Include the related pfp data
            var controleurs = await _context.controleurDeQualités
                                        .Include(c => c.Pfp) // Assuming the navigation property is called "Pfp"
                                        .ToListAsync();

            return controleurs;
        }


        // GET: api/ControleurDeQualité/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ControleurDeQualité>> GetControleurDeQualité(string id)
        {
            var controleurDeQualité = await _context.controleurDeQualités.FindAsync(id);

            if (controleurDeQualité == null)
            {
                return NotFound();
            }

            return controleurDeQualité;
        }
        // PUT: api/ControleurDeQualité/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutControleurDeQualité(string id, ControleurDeQualité controleurDeQualité)
        {
            if (id != controleurDeQualité.IdC)
            {
                return BadRequest();
            }

            try
            {
                _context.Entry(controleurDeQualité).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ControleurDeQualitéExists(id))
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


        // POST: api/ControleurDeQualité
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ControleurDeQualité>> PostControleurDeQualité(ControleurDeQualité controleurDeQualité)
        {
            _context.controleurDeQualités.Add(controleurDeQualité);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ControleurDeQualitéExists(controleurDeQualité.IdC))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetControleurDeQualité", new { id = controleurDeQualité.IdC }, controleurDeQualité);
        }

        // DELETE: api/ControleurDeQualité/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteControleurDeQualité(string id)
        {
            var controleurDeQualité = await _context.controleurDeQualités.FindAsync(id);
            if (controleurDeQualité == null)
            {
                return NotFound();
            }

            _context.controleurDeQualités.Remove(controleurDeQualité);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("VerifyUser")]
        public async Task<ActionResult<bool>> VerifyUser(string id, string password, string email)
        {
            var userExists = await _context.controleurDeQualités
                .AnyAsync(u => u.IdC == id && u.Password == password && u.Email == email);

            return Ok(userExists);
        }

        [HttpGet("ByDesignation/{designation}")]
        public async Task<ActionResult<IEnumerable<ControleurDeQualité>>> GetControleursByDesignation(string designation)
        {
            var controleurs = await _context.controleurDeQualités
                                            .Where(c => c.Designation == designation)
                                            .ToListAsync();

            if (controleurs == null || !controleurs.Any())
            {
                return NotFound();
            }

            return controleurs;
        }
        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<ControleurDeQualité>>> SearchControleurs(string keyword)
        {
            var controleurs = await _context.controleurDeQualités
                .Where(c => EF.Functions.Like(c.IdC, $"%{keyword}%")
                         || EF.Functions.Like(c.Nom, $"%{keyword}%")
                         || EF.Functions.Like(c.Email, $"%{keyword}%")
                         || EF.Functions.Like(c.Designation, $"%{keyword}%")
                         || EF.Functions.Like(c.Department, $"%{keyword}%")
                         || EF.Functions.Like(c.Adresse, $"%{keyword}%")
                         // Add additional fields here
                         )
                .ToListAsync();

            if (controleurs == null || !controleurs.Any())
            {
                return NotFound();
            }

            return controleurs;
        }


        private bool ControleurDeQualitéExists(string id)
        {
            return _context.controleurDeQualités.Any(e => e.IdC == id);
        }
    }
}
