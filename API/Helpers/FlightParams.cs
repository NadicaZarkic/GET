using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class FlightParams
    {
        
        public string PlaceOfDeparture { get; set; } = "Beograd";

        public string PlaceOfArrival { get; set; } = "Nis";
 

        public bool Transfers { get; set; } =  true;
    }
}