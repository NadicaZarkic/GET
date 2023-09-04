using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
﻿using API.DTOs;
using API.Models;
using API.Extensions;
using API.Interfaces;
using API.SignalR;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;


namespace API.SignalR
{
    public class ReservationHub:Hub
    {

         private readonly IReservationRepository _reservationRepository;
         private readonly IFlightRepository _flightRepository;

         public ReservationHub(IReservationRepository reservationRepository,IFlightRepository flightRepository)  {
            _reservationRepository = reservationRepository;
             _flightRepository = flightRepository;
         }

       public async Task ApproveReservation(ReservationDto reservationDto)
    {
      try
      {
         var reservation = await _reservationRepository.GetReservationAsync((int)reservationDto.ReservationId);

             if (reservation == null) throw new HubException("Not found reservation");
             
             reservation.Status = true;

            Flight flight = await _reservationRepository.GetFlightAsync((int)reservation.FlightId);

            if(flight.Seats>reservation.ReservedSeats)
            flight.Seats = flight.Seats - reservation.ReservedSeats;
            else throw new HubException("There are not that many free seats on the flight");

            await _reservationRepository.SaveAllAsync();

            await Clients.All.SendAsync("UpdateApproveReservation", reservationDto);
      }
        catch (Exception ex)
                { throw;
                }
    }

      public async Task AddReservation(ReservationDto reservationDto)
        {
            try{
            
            if (reservationDto == null) throw new HubException("Not found reservation");

            var flight = await _reservationRepository.GetFlightAsync((int)reservationDto.FlightId);

           if (flight == null) throw new HubException("Not found flight");
        
           DateTime dateFlight = flight.Date;
           DateTime currentDate = DateTime.Now;
           TimeSpan difference = currentDate - dateFlight;
           if (difference.TotalDays < 3)
            {
                throw new HubException("Reservation is less than 3 days from the current date.");

            }
            

                Reservation reservation = new Reservation
            {
                FlightId = reservationDto.FlightId,
                UserId = reservationDto.UserId,
                Status=false,
                ReservedSeats=reservationDto.ReservedSeats
            };

              _reservationRepository.SaveReservation(reservation);
                 await _reservationRepository.SaveAllAsync();

           await Clients.All.SendAsync("UpdateApproveReservation", reservationDto);
            }
             catch (Exception ex)
                {
                    throw;
                }
        
        }
    }

    
}