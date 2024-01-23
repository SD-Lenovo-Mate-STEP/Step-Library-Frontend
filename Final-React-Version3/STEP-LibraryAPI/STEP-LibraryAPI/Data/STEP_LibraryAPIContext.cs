using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using STEP_E_LibraryAPI.Models;

namespace STEP_LibraryAPI.Data
{
    public class STEP_LibraryAPIContext : DbContext
    {
        public STEP_LibraryAPIContext (DbContextOptions<STEP_LibraryAPIContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<STEP_E_LibraryAPI.Models.User> Users { get; set; } = default!;
        public DbSet<STEP_E_LibraryAPI.Models.Librarian> Librarians { get; set; } = default!;
        public DbSet<STEP_E_LibraryAPI.Models.Book> Books { get; set; } = default!;
        public DbSet<STEP_E_LibraryAPI.Models.Group> Groups { get; set; } = default!;
    }
}
