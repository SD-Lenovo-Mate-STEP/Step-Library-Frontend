using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace STEP_E_LibraryAPI.Models
{
    public class Group
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [ForeignKey(nameof(UserID))]
        public int UserID { get; set; }
    }
}
