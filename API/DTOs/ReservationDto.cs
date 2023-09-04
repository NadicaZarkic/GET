using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ReservationDto
    {
        public long ReservationId { get; set; }
        public long? FlightId { get; set; }
        public int? UserId { get; set; }
        public int? ReservedSeats { get; set; }
        public bool? Status { get; set; }

    
    }
}