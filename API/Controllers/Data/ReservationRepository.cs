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

namespace API.Controllers.Data
{
    public class ReservationRepository:IReservationRepository
    {
         private readonly GetContext _context;
        private readonly IMapper _mapper;
        public ReservationRepository(GetContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }


        public async Task<bool> SaveAllAsync()
        {
           return await _context.SaveChangesAsync() > 0;
        }

          public async Task<Reservation> GetReservationAsync(int id)
        {
                return await _context.Reservations
                .Where(x => x.ReservationId == id)
                .SingleOrDefaultAsync();
        }

         public async Task<Flight> GetFlightAsync(int id)
        {
                return await _context.Flights
                .Where(x => x.FlightId == id)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<ReservationDto>> GetAllNotApprovedReservation()
         {
            return await _context.Reservations
            .Where(x => x.Status == false)
            .ProjectTo<ReservationDto>(_mapper.ConfigurationProvider).ToListAsync();
        
         }

           public async Task<IEnumerable<ReservationDto>> GetMyReservations(int userID)
         {
            return await _context.Reservations
            .Where(p=>p.UserId==userID)
            .ProjectTo<ReservationDto>(_mapper.ConfigurationProvider).ToListAsync();
        
         }

        public async Task<AspNetUser> GetUserAsync(int id)
         {
               return await _context.AspNetUsers
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();
         }

         public void AddGroup(Group group)
        {
            _context.Groups.Add(group);
        }

        public async Task<Connection> GetConnection(string connectionId)
        {
            return await _context.Connections.FindAsync(connectionId);
        }

        public async Task<Group> GetReservationGroup(string groupName)
        {
             return await _context.Groups
             .Include(x => x.Connections)
             .FirstOrDefaultAsync(x=>x.Name == groupName);
        }

        public void RemoveConnection(Connection connection)
        {
             _context.Connections.Remove(connection);
        }

        public async Task<Group> GetGroupForConnection(string connectionId)
        {
           return await _context.Groups
           .Include(x => x.Connections)
           .Where(x=> x.Connections.Any(c=> c.ConnectionId == connectionId))
           .FirstOrDefaultAsync();
        }

            public void SaveReservation(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
        }

    }

}