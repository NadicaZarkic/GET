using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using API.DTOs;
using API.Helpers;

namespace API.Controllers
{
    public class FlightRepository:IFlightRepository
    {
         private readonly GetContext _context;
        private readonly IMapper _mapper;
        public FlightRepository(GetContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

         public async Task<bool> SaveAllAsync()
        {
           return await _context.SaveChangesAsync() > 0;
        }


         public async Task<IEnumerable<FlightDto>> GetAllFlights()
         {
            return await _context.Flights.ProjectTo<FlightDto>(_mapper.ConfigurationProvider).ToListAsync();
        
         }

          public void SaveFlight(Flight flight)
        {
            _context.Flights.Add(flight);
        }

         public async Task<Flight> GetFlightAsync(int id)
        {
                return await _context.Flights
                .Where(x => x.FlightId == id)
                .SingleOrDefaultAsync();
        }

     public async Task<FlightDto> GetFlight(int id)
        {
                return await _context.Flights
                .Where(x => x.FlightId == id)
                .ProjectTo<FlightDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }
       

        public  void Update(Flight flight)
        {
           _context.Entry(flight).State = EntityState.Modified;
        }

        public async Task<IEnumerable<FlightDto>> GetFilterFlightsAsync(FlightParams flightParams)
        {
           var allFlights =_context.Flights.ProjectTo<FlightDto>(_mapper.ConfigurationProvider).AsQueryable();
           List<FlightDto> listOfFlights = new List<FlightDto>();


               allFlights = allFlights
                     .Where(r=>r.PlaceOfDeparture == flightParams.PlaceOfDeparture)
                     .Where(p=>p.PlaceOfArrival == flightParams.PlaceOfArrival)
                     .Where(f=>f.Seats>0);
                  
               if(flightParams.Transfers==false)
               {
                  allFlights = allFlights.Where(x=>x.Transfers==0);
               }
             
              listOfFlights= allFlights.ToList().GroupBy(x => x.Date).Select(x => x.First()).ToList();


               // IEnumerable<FlightDto> dataList = allFlights as IEnumerable<FlightDto>;

               // dataList=(from num in dataList select num.Date).Distinct();


               return  listOfFlights;

        }



       
    }
}