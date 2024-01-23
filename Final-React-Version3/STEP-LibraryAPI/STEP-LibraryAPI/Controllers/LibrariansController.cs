using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using STEP_E_LibraryAPI.Models;
using STEP_LibraryAPI.Data;

namespace STEP_E_LibraryAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LibrariansController : ControllerBase
    {
        private readonly STEP_LibraryAPIContext _context;

        public LibrariansController(STEP_LibraryAPIContext context)
        {
            _context = context;
        }

        // GET: api/Librarians
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Librarian>>> GetLibrarian()
        {

            return await _context.Librarians.ToListAsync();
        }

        // GET: api/Librarians/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Librarian>> GetLibrarian(int id)
        {
            var librarian = await _context.Librarians.FindAsync(id);

            if (librarian == null)
            {
                return NotFound();
            }

            return librarian;
        }

        [HttpPost("{username}/{password}/login")]
        public Task<ActionResult<Librarian>> GetLogin(string username, string password)
        {
            if (_context.Librarians == null)
            {
                return Task.FromResult<ActionResult<Librarian>>(NotFound(new Hashtable { { "Token", " " }, { "Error", "Incorrect Username or Password" } }));

            }
            var librarian = _context.Librarians.FirstOrDefault(u => u.Username == username && u.Password == password);
            if (librarian == null)
            {
                return Task.FromResult<ActionResult<Librarian>>(NotFound(new Hashtable { { "Token", " " }, { "Error", "Incorrect Username or Password" } }));
            }
            librarian.Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkFkbWluIiwic3ViIjoiQWRtaW4iLCJqdGkiOiJhYjQ0YWExIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDUyMDgiLCJodHRwczovL2xvY2FsaG9zdDo0NDM0MyIsImh0dHA6Ly9sb2NhbGhvc3Q6NTA0NSIsImh0dHBzOi8vbG9jYWxob3N0OjcxMTgiXSwibmJmIjoxNzA1NzY1ODE1LCJleHAiOjE3MTM2MjgyMTUsImlhdCI6MTcwNTc2NTgxNiwiaXNzIjoiZG90bmV0LXVzZXItand0cyJ9.HdpYMwMkN9S7P_m_yvKTgkMR5oJZ-ZFmHZbKG-USTfw";
            _context.SaveChanges();
            return Task.FromResult<ActionResult<Librarian>>(Ok(librarian));
        }

        // PUT: api/Librarians/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLibrarian(int id, Librarian librarian)
        {
            if (id != librarian.Id)
            {
                return BadRequest();
            }

            _context.Entry(librarian).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LibrarianExists(id))
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

        // POST: api/Librarians
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Librarian>> PostLibrarian(RegisterUserBinding registerLibrarian)
        {
            if ((registerLibrarian.Username.Length == 0) || (registerLibrarian.Password.Length == 0) || (registerLibrarian.Confirm_Password.Length == 0))
            {
                return BadRequest();
            }
            else if (registerLibrarian.Password != registerLibrarian.Confirm_Password)
            {
                return BadRequest();
            }
            else if ((registerLibrarian.Username == "string") && (registerLibrarian.Password == "string"))
            {
                return BadRequest();
            }
            Librarian librarian = registerLibrarian.ToLibrarianRegistration();

            _context.Librarians.Add(librarian);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLibrarian", new { id = librarian.Id }, registerLibrarian);
        }

        // DELETE: api/Librarians/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibrarian(int id)
        {
            var librarian = await _context.Librarians.FindAsync(id);
            if (librarian == null)
            {
                return NotFound();
            }

            _context.Librarians.Remove(librarian);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LibrarianExists(int id)
        {
            return _context.Librarians.Any(e => e.Id == id);
        }
    }
}
