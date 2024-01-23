
namespace STEP_E_LibraryAPI.Models
{
    public class UserBinding
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        internal User ToUser()
        {
            return new User { Username = Username, Password = Password };

        }
    }

    public class RegisterUserBinding
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Confirm_Password { get; set; } = string.Empty;

        internal User ToUserRegistration()
        {
            return new User { Username = Username, Password = Password, Role = "Teacher" };

        }

        internal Librarian ToLibrarianRegistration()
        {
            return new Librarian { Username = Username, Password = Password, Role = "Librarian" };

        }
    }
}
