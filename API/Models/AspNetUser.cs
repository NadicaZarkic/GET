using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
#nullable disable

namespace API.Models
{
    public partial class AspNetUser:IdentityUser<int>
    {
        public AspNetUser()
        {
            AspNetUserLogins = new HashSet<AspNetUserLogin>();
            AspNetUserRoles = new HashSet<AspNetUserRole>();
            AspNetUserTokens = new HashSet<AspNetUserToken>();
            Reservations = new HashSet<Reservation>();
        }

       // public int Id { get; set; }
        
      //  public string UserName { get; set; }
      //  public string PasswordHash { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public DateTime Created { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Interests { get; set; }
        public string Introduction { get; set; }
        public string KnownAs { get; set; }
        public DateTime LastActive { get; set; }
        public string LookingFor { get; set; }
        public int AccessFailedCount { get; set; }
        public string ConcurrencyStamp { get; set; }
        // public string Email { get; set; }
     //   public bool EmailConfirmed { get; set; }
        public bool LockoutEnabled { get; set; }
        public DateTimeOffset? LockoutEnd { get; set; }
        public string NormalizedEmail { get; set; }
        public string NormalizedUserName { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public string SecurityStamp { get; set; }
        public bool TwoFactorEnabled { get; set; }

        public virtual AspNetUserClaim AspNetUserClaim { get; set; }
        public virtual ICollection<AspNetUserLogin> AspNetUserLogins { get; set; }
        public virtual ICollection<AspNetUserRole> AspNetUserRoles { get; set; }
        public virtual ICollection<AspNetUserToken> AspNetUserTokens { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
