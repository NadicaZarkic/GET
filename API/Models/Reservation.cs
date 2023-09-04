using System;
using System.Collections.Generic;

#nullable disable

namespace API.Models
{
    public partial class Reservation
    {
        public long ReservationId { get; set; }
        public long? FlightId { get; set; }
        public int? ReservedSeats { get; set; }
        public bool? Status { get; set; }
        public int? UserId { get; set; }

        public virtual Flight Flight { get; set; }
        public virtual AspNetUser User { get; set; }
    }
}
