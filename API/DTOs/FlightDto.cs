using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class FlightDto
    {
        public long FlightId { get; set; }
        public string PlaceOfDeparture { get; set; }
        public string PlaceOfArrival { get; set; }
        public DateTime? Date { get; set; }
        public int? Transfers { get; set; }
        public int? Seats { get; set; }

        public long ReservationId { get; set; }
    }
}