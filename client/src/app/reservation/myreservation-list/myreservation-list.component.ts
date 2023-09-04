import { Component, OnDestroy } from '@angular/core';
import { take } from 'rxjs';
import { Reservation } from 'src/app/_models/reservation';
import { ApprovedhubService } from 'src/app/_service/approvedhub.service';
import { SharedDataServiceService } from 'src/app/_service/shared-data-service.service';
import { AccountService } from 'src/app/_services/account.service';
import { ReservationService } from 'src/app/_services/reservation.service';

@Component({
  selector: 'app-myreservation-list',
  templateUrl: './myreservation-list.component.html',
  styleUrls: ['./myreservation-list.component.css']
})
export class MyreservationListComponent implements OnDestroy{

  userId:number | undefined;
  reservations : Reservation[] | undefined;
  reservationStatus: string;


  constructor(private reservationService: ReservationService, private accountService:AccountService,private sharedDataService: SharedDataServiceService,
    private approvedHub:ApprovedhubService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user =>{
        if(user){
          this.userId = user.userId;
        }
      }
    });
    this.loadReservations()
    this.approvedHub.startConnection();
    this.approvedHub.onReservationUpdate((reservation) => {
      
      this.loadReservations()
     
    });


    
  }

  loadReservations() {
    if(this.userId)
    this.reservationService.getMyReservations(this.userId).subscribe({
      next: response => {
        this.reservations = response;
    
      }
    })
  }

  ngOnDestroy(): void {
    this.approvedHub.stopConnection();
  }
}


