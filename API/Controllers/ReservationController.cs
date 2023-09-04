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
     
    public class ReservationController:BaseApiController
    {
        private readonly IReservationRepository _reservationRepository;
         private readonly IMapper _mapper;
        
        public ReservationController(IReservationRepository reservationRepository, IMapper mapper)
        {
           
            _mapper = mapper;
            _reservationRepository = reservationRepository;
        }


         [HttpPut]
        public async Task<ActionResult> ApproveReservation(ReservationDto reservationDto)
        {
            var reservation = await _reservationRepository.GetReservationAsync((int)reservationDto.ReservationId);

             if (reservation == null) return NotFound();
             
             reservation.Status = true;

            Flight flight = await _reservationRepository.GetFlightAsync((int)reservation.FlightId);

            if(flight.Seats>reservation.ReservedSeats)
            flight.Seats = flight.Seats - reservation.ReservedSeats;
            else return BadRequest("There are not that many free seats on the flight");

            if (await _reservationRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to approve reservation");
        }


         [HttpGet]
          public async Task<ActionResult<IEnumerable<ReservationDto>>> GetAllNotApprovedReservation()
        {
            
            var reservations = await _reservationRepository.GetAllNotApprovedReservation();
         

            return Ok(reservations);
        }
        
         [HttpGet("getMyReservations/{id}")]
           public async Task<ActionResult<IEnumerable<ReservationDto>>> GetMyReservations(int id)
        {
            
            var reservations = await _reservationRepository.GetMyReservations(id);
         

            return Ok(reservations);
        }

         [HttpPost("saveReservation/{userId}/{flightId}/{reservedSeats}")]
        public async Task<ActionResult> SaveReservation (int userId,int flightId,int reservedSeats)
        {
            

            Reservation reservation = new Reservation{
                FlightId = flightId,
                UserId = userId,
                Status=false,
                ReservedSeats=reservedSeats
            };

            

            _reservationRepository.SaveReservation(reservation);

            if (await _reservationRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to save reservation");
        }

        



        
    }
}