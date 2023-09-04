using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.DTOs;
using API.Helpers;


namespace API.Interfaces
{
    public interface IReservationRepository
    {
         Task<bool> SaveAllAsync();

         Task<Reservation> GetReservationAsync(int id);

         Task<Flight> GetFlightAsync(int id);

          Task<IEnumerable<ReservationDto>> GetAllNotApprovedReservation();

          Task<IEnumerable<ReservationDto>> GetMyReservations(int userID);

          Task<AspNetUser> GetUserAsync(int id);

           void AddGroup(Group group);

        void RemoveConnection(Connection connection);

        Task<Connection> GetConnection(string connectionId);

        Task<Group> GetReservationGroup(string groupName);

        Task <Group> GetGroupForConnection(string connectionId);
        void SaveReservation(Reservation reservation);

    }
}