using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
#nullable disable

namespace API.Models
{
    public partial class AspNetUserClaim:IdentityUserClaim<int>
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }

        public virtual AspNetUser IdNavigation { get; set; }
    }
}
