using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Controllers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using API.Models;
using API.Helpers;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{

   
    public class FlightController:BaseApiController
    {
         private readonly IFlightRepository _flightRepository;
         private readonly IMapper _mapper;
        
        public FlightController(IFlightRepository flightRepository, IMapper mapper)
        {
           
            _mapper = mapper;
            _flightRepository = flightRepository;
        }

        
       // [Authorize(Policy="getFlights")]

      //  [Authorize]
        [HttpGet]
                 public async Task<ActionResult<IEnumerable<FlightDto>>> GetAllFlights()
        {
            
            var flights = await _flightRepository.GetAllFlights();
         

            return Ok(flights);
        }
        


         [HttpPost]
        public async Task<ActionResult> SaveFlight (FlightDto flightDto)
        {
         
            if (flightDto == null) return NotFound();

            Flight flight = new Flight();

            _mapper.Map(flightDto, flight);

            _flightRepository.SaveFlight(flight);

            if (await _flightRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to save flight");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateFlight(FlightDto flightDto)
        {
           

            var flight = await _flightRepository.GetFlightAsync((int)flightDto.FlightId);

             if (flight == null) return NotFound();
            _flightRepository.Update(flight);

            _mapper.Map(flightDto, flight);

            if (await _flightRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update flight");
        }


         [HttpGet("{id}")]
        public async Task<ActionResult<FlightDto>> GetFlightByID(int id)
        {
            
            return await _flightRepository.GetFlight(id);
        }


          [HttpGet("getfilter")]
          public async Task<ActionResult<IEnumerable<FlightDto>>> GetFilterFlights([FromQuery]FlightParams flightParams)
        {
            
            var flights = await _flightRepository.GetFilterFlightsAsync(flightParams);

            
            return Ok(flights);
        }


         

            

         

    }
}