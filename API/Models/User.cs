using System;
using System.Collections.Generic;

#nullable disable

namespace API.Models
{
    public partial class User
    {
        public User()
        {
            Reservations = new HashSet<Reservation>();
        }

        public long UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PasswordSalt { get; set; }
        public long? RoleId { get; set; }
        public string Username { get; set; }

        public virtual Role Role { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
