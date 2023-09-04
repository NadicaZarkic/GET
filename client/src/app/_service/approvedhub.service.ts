import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Reservation } from '../_models/reservation';
import { SharedDataServiceService } from './shared-data-service.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApprovedhubService {

  private hubConnection: HubConnection;
  hubUrl = 'https://localhost:5001/hubs/';
  


  constructor(private sharedDataService: SharedDataServiceService,private toastr:ToastrService) { 

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl +'reservation')
      .build();
  }

  startConnection(): void {
    this.hubConnection.start()
      .then(() => {
        console.log('Connected to the Flight Reservation Hub');
      })
      .catch(err => this.toastr.error('Error while connecting to the hub:', err));
  }

  

  stopConnection(): Promise<void> {
    return this.hubConnection.stop();
  }

  getHubConnection(): HubConnection {
    return this.hubConnection;
  }

  onReservationUpdate(callback: (reservation:Reservation) => void): void {
    this.hubConnection.on('UpdateApproveReservation', (reservation:Reservation) => {
      callback(reservation);
    });
  }

  reserveSeats(reservation:Reservation): void {
    this.hubConnection.invoke('ApproveReservation', reservation)
      .catch(err => this.toastr.error('Error while reserving seats:'+ err.message));
  }

  onReservationAddUpdate(callback: (reservation:Reservation) => void): void {
    this.hubConnection.on('UpdateAddReservation', (reservation:Reservation) => {
      callback(reservation);

    });
  }

  addReservation(reservation:Reservation): void {
    this.hubConnection.invoke('AddReservation', reservation)
      .catch(err => this.toastr.error('Error while adding reservation:'+ err.message));
  }



 
}
