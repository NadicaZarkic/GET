import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, take, throwError } from 'rxjs';
import { Reservation } from 'src/app/_models/reservation';
import { User } from 'src/app/_models/user';
import { ApprovedhubService } from 'src/app/_service/approvedhub.service';
import { SharedDataServiceService } from 'src/app/_service/shared-data-service.service';
import { AccountService } from 'src/app/_services/account.service';
import { ReservationService } from 'src/app/_services/reservation.service';

@Component({
  selector: 'app-reservation-approved',
  templateUrl: './reservation-approved.component.html',
  styleUrls: ['./reservation-approved.component.css']
})
export class ReservationApprovedComponent implements OnDestroy {
  userId:number | undefined;
  reservations : Reservation[] | undefined;
  user:User | undefined;


  constructor(private reservationService: ReservationService, private accountService:AccountService,
    private toastr:ToastrService,private approvedHub:ApprovedhubService,private sharedDataService: SharedDataServiceService)
    
    { 

      
    }
    
    reservationCount: number;


  ngOnInit(): void {
  
    this.approvedHub.startConnection();
    
    this.approvedHub.onReservationUpdate((reservation) => {
      this.loadReservations()
     
    });

   

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user =>{
        if(user){
          this.userId = user.userId;
        }
      }
    });
    

     this.loadReservations();


  }

  loadReservations() {
    if(this.userId)
    this.reservationService.getGetAllNotApprovedReservation().subscribe({
      next: response => {
        this.reservations = response;
    
      }
    })
  }

  // approve(reservation:Reservation)
  // {
  //   this.reservationService.approveReservation(reservation).subscribe({
  //     next: _ => {
  //       this.toastr.success('The reservation is approved');
  //     }
  //   })
  //   this.loadReservations();
  // }

  approve(reservation:Reservation): void {
    
     if(reservation)
      this.approvedHub.reserveSeats(reservation)
   
    

    this.sharedDataService.updateReservationStatus('Approved');
  }

  ngOnDestroy(): void {
    this.approvedHub.stopConnection();
   
  }
}
