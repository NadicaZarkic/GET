using System;
using System.Collections.Generic;

#nullable disable

namespace API.Models
{
    public partial class Flight
    {
        public Flight()
        {
            Reservations = new HashSet<Reservation>();
        }

        public long FlightId { get; set; }
        public string PlaceOfDeparture { get; set; }
        public string PlaceOfArrival { get; set; }
        public DateTime Date { get; set; }
        public int? Transfers { get; set; }
        public int? Seats { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
