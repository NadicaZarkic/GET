import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../_models/reservation';
import { AccountService } from './account.service';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  baseUrl = 'https://localhost:5001/api/';
  hubUrl = 'https://localhost:5001/hubs/';
  private hubConnection:HubConnection;
  private reservationThreadSource = new BehaviorSubject<Reservation[]>([]);
  reservationThread$ = this.reservationThreadSource.asObservable();

  constructor(private http: HttpClient) { }


  createHubConnection(user:User,otherId:number)
  {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(this.hubUrl + 'reservation?user='+otherId,{
      accessTokenFactory:() => user.token
    })
    .withAutomaticReconnect()
    .build()

    this.hubConnection.start().catch(error=>console.log(error));

    this.hubConnection.on('GetMyReservations',reservations => {
      this.reservationThreadSource.next(reservations);
    })

  }

  stopHubConnection()
  {
    if(this.hubConnection)
    {
      this.hubConnection.stop();

    }
  }
  getMyReservations(userID:number)
{
  return this.http.get<Reservation[]>(this.baseUrl + 'reservation/getMyReservations/'+userID);
}

getGetAllNotApprovedReservation()
{
  return this.http.get<Reservation[]>(this.baseUrl + 'reservation/');
}

approveReservation(reservation:Reservation)
{
  return this.http.put(this.baseUrl + 'reservation',reservation);
}

addReservation(userId:number,flightId:number,reservedSeats:number)
{
  return this.http.post(this.baseUrl + 'reservation/saveReservation/'+userId+"/"+flightId+"/"+reservedSeats,[] );

}

}
