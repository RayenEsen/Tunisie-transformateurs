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
    public class EventsController : ControllerBase
    {
        private readonly TransformateurContext _context;

        public EventsController(TransformateurContext context)
        {
            _context = context;
        }

        // GET: api/Events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> Getevents()
        {
            var events = await _context.events.OrderByDescending(e => e.EventDate).ToListAsync();
            return events;
        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var @event = await _context.events.FindAsync(id);

            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }

        // PUT: api/Events/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, Event @event)
        {
            if (id != @event.Ide)
            {
                return BadRequest();
            }

            _context.Entry(@event).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
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

        // POST: api/Events
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(Event @event)
        {
            _context.events.Add(@event);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEvent", new { id = @event.Ide }, @event);
        }

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var @event = await _context.events.FindAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            _context.events.Remove(@event);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // GET: api/Events/ByController/{controllerId}
        [HttpGet("ByController/{controllerId}")]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventsByController(string controllerId)
        {
            var events = await _context.events
                .Where(e => e.IdC == controllerId)
                .OrderByDescending(e => e.EventDate)
                .Take(3)
                .ToListAsync();

            if (events == null || events.Count == 0)
            {
                return NotFound();
            }

            return events;
        }


        private bool EventExists(int id)
        {
            return _context.events.Any(e => e.Ide == id);
        }
    }
}
