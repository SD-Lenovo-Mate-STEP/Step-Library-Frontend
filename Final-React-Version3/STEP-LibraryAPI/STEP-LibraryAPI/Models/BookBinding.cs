using System.ComponentModel.DataAnnotations;

namespace STEP_E_LibraryAPI.Models
{
    public class BookBinding
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        public string Authors { get; set; } = string.Empty;
        public int Pages { get; set; }
        //[MinLength(10, ErrorMessage = "ISBN10 Must be 10 Digits Long."), MaxLength(10)]
        //public string Isbn10 { get; set; } = string.Empty;
        //[MinLength(14, ErrorMessage = "ISBN14 Must be 14 Digits Long."), MaxLength(14)]

        //public string Isbn14 { get; set; } = string.Empty;

        public string BookPath { get; set; } = string.Empty ;

        public Book ToBook()
        {
            return new Book { Title = Title, Authors = Authors, Pages = Pages, BookPath = BookPath};
        }
    }
}
