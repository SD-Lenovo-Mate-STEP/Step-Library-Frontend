using System.ComponentModel.DataAnnotations;

namespace STEP_E_LibraryAPI.Models
{
    public class Book
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        public string Authors { get; set; } = string.Empty;
        public int Pages { get; set; }
        public string BookPath { get; set; } = string.Empty;
        //public string Isbn10 { get; set; } = string.Empty;
        //public string Isbn14 { get; set; } = string.Empty;
    }
}
