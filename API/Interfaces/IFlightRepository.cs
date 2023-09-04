using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.DTOs;
using API.Helpers;

namespace API.Interfaces
{
    public interface IFlightRepository
    {
      Task<IEnumerable<FlightDto>> GetAllFlights();

      void SaveFlight(Flight flight);
      Task<bool> SaveAllAsync();

      void Update(Flight flight);

     Task<Flight> GetFlightAsync(int id);

     Task<FlightDto> GetFlight(int id);

     Task<IEnumerable<FlightDto>> GetFilterFlightsAsync(FlightParams flightParams);


     
    }
}