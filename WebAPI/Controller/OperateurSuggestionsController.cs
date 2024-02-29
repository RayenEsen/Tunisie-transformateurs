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
    public class OperateurSuggestionsController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public OperateurSuggestionsController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/OperateurSuggestions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> GetOperateurSuggestions()
        {
            var suggestions = await _context.OperateurSuggestions.Select(s => s.Nom).ToListAsync();
            return suggestions;
        }

        // GET: api/OperateurSuggestions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OperateurSuggestions>> GetOperateurSuggestions(int id)
        {
            var operateurSuggestions = await _context.OperateurSuggestions.FindAsync(id);

            if (operateurSuggestions == null)
            {
                return NotFound();
            }

            return operateurSuggestions;
        }

        // PUT: api/OperateurSuggestions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOperateurSuggestions(int id, OperateurSuggestions operateurSuggestions)
        {
            if (id != operateurSuggestions.IdOperateur)
            {
                return BadRequest();
            }

            _context.Entry(operateurSuggestions).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OperateurSuggestionsExists(id))
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

        // POST: api/OperateurSuggestions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OperateurSuggestions>> PostOperateurSuggestions(OperateurSuggestions operateurSuggestions)
        {
            _context.OperateurSuggestions.Add(operateurSuggestions);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOperateurSuggestions", new { id = operateurSuggestions.IdOperateur }, operateurSuggestions);
        }

        // DELETE: api/OperateurSuggestions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOperateurSuggestions(int id)
        {
            var operateurSuggestions = await _context.OperateurSuggestions.FindAsync(id);
            if (operateurSuggestions == null)
            {
                return NotFound();
            }

            _context.OperateurSuggestions.Remove(operateurSuggestions);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OperateurSuggestionsExists(int id)
        {
            return _context.OperateurSuggestions.Any(e => e.IdOperateur == id);
        }
    }
}
