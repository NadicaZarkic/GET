using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using API.Models;
using API.DTOs;

namespace API.Helpers
{
    public class AutoMapperProfiles:Profile
    {
         public AutoMapperProfiles()
        {
            CreateMap<Flight, FlightDto>();
            CreateMap<FlightUpdateDto, Flight>();
            CreateMap<FlightDto, Flight>();
            CreateMap<ReservationDto, Reservation>();
            CreateMap<Reservation, ReservationDto>();
            CreateMap<RegisterDto,AspNetUser>();

        }
    }
}