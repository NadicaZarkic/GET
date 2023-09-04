using System;
using System.Collections.Generic;

#nullable disable

namespace API.Models
{
    public partial class Group
    {
        public Group()
        {
            Connections = new HashSet<Connection>();
        }

        public string Name { get; set; }

        public virtual ICollection<Connection> Connections { get; set; }
    }
}
