using System;
using System.Collections.Generic;

#nullable disable

namespace API.Models
{
    public partial class Connection
    {
        public string ConnectionId { get; set; }
        public string Username { get; set; }
        public string GroupName { get; set; }

        public virtual Group GroupNameNavigation { get; set; }
    }
}
