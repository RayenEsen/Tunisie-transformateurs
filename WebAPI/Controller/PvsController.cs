﻿using System;
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pv>>> Getpvs()
        {
            return await _context.pvs
                .Include(pv => pv.ControleurDeQualite) // Include the ControleurDeQualite navigation property
                .ToListAsync();
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

        [HttpGet("ByTransformateur/{transformateurId}")]
        public async Task<ActionResult<IEnumerable<Pv>>> GetPvsByTransformateur(int transformateurId)
        {
            // Retrieve all PVs that correspond to the given Transformateur ID
            var pvs = await _context.pvs
                .Include(p => p.ControleurDeQualite) // Include the ControleurDeQualite navigation property
                .Where(p => p.Id_t == transformateurId)
                .ToListAsync();

            if (pvs == null || pvs.Count == 0)
            {
                return NotFound();
            }

            return pvs;
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
        [HttpGet("CountByResult/{result}")]
        public async Task<ActionResult<int>> GetPvsCountByResult(string result)
        {
            try
            {
                // Convert the result parameter to uppercase for case-insensitive comparison
                result = result.ToUpper();

                // Retrieve the count of PVs with the specified result
                var count = await _context.pvs.CountAsync(p => p.Resultat.ToUpper() == result);

                return count;
            }
            catch (Exception ex)
            {
                // Handle exceptions as needed
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }


        private bool PvExists(int id)
        {
            return _context.pvs.Any(e => e.Id_pv == id);
        }
    }
}
