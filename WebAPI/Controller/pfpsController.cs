using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using WebAPI.Model;

namespace WebAPI.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class pfpsController : ControllerBase
    {
        private readonly TransformateurContext _context;
        private readonly IWebHostEnvironment _environment;

        public pfpsController(TransformateurContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;

        }

        // GET: api/pfps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<pfp>>> Getpfps()
        {
            return await _context.pfps.ToListAsync();
        }

        // GET: api/pfps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<pfp>> Getpfp(int id)
        {
            var pfp = await _context.pfps.FindAsync(id);

            if (pfp == null)
            {
                return NotFound();
            }

            return pfp;
        }
        // GET: api/pfps/image/{controleurId}
        [HttpGet("image/{controleurId}")]
        public async Task<IActionResult> GetImage(string controleurId)
        {
            // Find the pfp that corresponds to the given controleurId
            var pfp = await _context.pfps.FirstOrDefaultAsync(p => p.IdC == controleurId);

            if (pfp == null || string.IsNullOrEmpty(pfp.Pathway))
            {
                return NotFound();
            }

            // Read the image file
            var imageBytes = await System.IO.File.ReadAllBytesAsync(pfp.Pathway);

            // Return the image file with appropriate content type
            return File(imageBytes, "image/jpeg");
        }


        // PUT: api/pfps/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putpfp(int id, pfp pfp)
        {
            if (id != pfp.Idpfp)
            {
                return BadRequest();
            }

            _context.Entry(pfp).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!pfpExists(id))
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

        // POST: api/pfps
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<pfp>> Postpfp([FromQuery] string controleurId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            // Get the path to the "uploads" directory under the solution's WebAPI folder
            var uploadsDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "uploads");

            // Ensure the uploads directory exists
            if (!Directory.Exists(uploadsDirectory))
                Directory.CreateDirectory(uploadsDirectory);

            // Generate a unique file name
            var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            var filePath = Path.Combine(uploadsDirectory, uniqueFileName);

            // Save the file to the server
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            // Create the pfp entity
            var pfp = new pfp
            {
                IdC = controleurId,
                Pathway = filePath // Store the file path in the Pathway property
            };

            // Add the pfp entity to the database context
            _context.pfps.Add(pfp);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getpfp", new { id = pfp.Idpfp }, pfp);
        }



        // DELETE: api/pfps/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletepfp(int id)
        {
            var pfp = await _context.pfps.FindAsync(id);
            if (pfp == null)
            {
                return NotFound();
            }

            _context.pfps.Remove(pfp);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool pfpExists(int id)
        {
            return _context.pfps.Any(e => e.Idpfp == id);
        }
    }
}
