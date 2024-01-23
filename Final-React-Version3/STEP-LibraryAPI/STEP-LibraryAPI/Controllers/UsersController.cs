using System.Collections;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using STEP_E_LibraryAPI.Models;
using STEP_LibraryAPI.Data;

namespace STEP_E_LibraryAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly STEP_LibraryAPIContext _context;

        public UsersController(STEP_LibraryAPIContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
        [AllowAnonymous]
        [HttpPost("{username}/{password}/login")]
        public Task<ActionResult<User>> GetLogin(string username, string password)
        {
            if (_context.Users == null)
            {
                return Task.FromResult<ActionResult<User>>(Ok(new Hashtable { { "Token", " " }, { "Error", "Incorrect Username or Password" } }));

            }
            var user = _context.Users.FirstOrDefault(u => u.Username == username && u.Password == password);
            if (user == null)
            {
                return Task.FromResult<ActionResult<User>>(Ok(new Hashtable { { "Token", " " }, { "Error", "Incorrect Username or Password" } }));

            }
            user.Role = "Teacher";
            user.Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkFkbWluIiwic3ViIjoiQWRtaW4iLCJqdGkiOiJhYjQ0YWExIiwiYXVkIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDUyMDgiLCJodHRwczovL2xvY2FsaG9zdDo0NDM0MyIsImh0dHA6Ly9sb2NhbGhvc3Q6NTA0NSIsImh0dHBzOi8vbG9jYWxob3N0OjcxMTgiXSwibmJmIjoxNzA1NzY1ODE1LCJleHAiOjE3MTM2MjgyMTUsImlhdCI6MTcwNTc2NTgxNiwiaXNzIjoiZG90bmV0LXVzZXItand0cyJ9.HdpYMwMkN9S7P_m_yvKTgkMR5oJZ-ZFmHZbKG-USTfw";

            _context.SaveChanges();
            return Task.FromResult<ActionResult<User>>(Ok(user));
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<RegisterUser>> PostUser(RegisterUserBinding userRegister)
        {
            if ((userRegister.Username.Length == 0) || (userRegister.Password.Length == 0) || (userRegister.Confirm_Password.Length == 0))
            {
                return BadRequest();
            }
            else if (userRegister.Password != userRegister.Confirm_Password)
            {
                return BadRequest();
            }
            else if ((userRegister.Username == "string") && (userRegister.Password == "string"))
            {
                return BadRequest();
            }

            User user = userRegister.ToUserRegistration();
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, userRegister);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
