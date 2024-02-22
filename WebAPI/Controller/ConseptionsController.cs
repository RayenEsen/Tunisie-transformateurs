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
    public class ConseptionsController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public ConseptionsController(TransformateurContext context)
        {
            _context = context;
        }

        // POST: api/Conseptions/{transformateurId}
        [HttpPost("{transformateurId}")]
        public async Task<ActionResult<Conseption>> AddConseptionToTransformateur(int transformateurId, [FromBody] Conseption conseption)
        {
            var transformateur = await _context.transformateurs.FindAsync(transformateurId);
            if (transformateur == null)
            {
                return NotFound("Transformateur not found");
            }

            // Assign the transformateurId to the Numero property
            conseption.Numero = transformateurId;

            // Assign the Transformateur navigation property
            conseption.Transformateur = transformateur;

            _context.Conseptions.Add(conseption);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConseption", new { id = conseption.IdConseption }, conseption);
        }

    }
}
