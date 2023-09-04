import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Flight } from 'src/app/_models/flight';
import { Reservation } from 'src/app/_models/reservation';
import { User } from 'src/app/_models/user';
import { ApprovedhubService } from 'src/app/_service/approvedhub.service';
import { AccountService } from 'src/app/_services/account.service';
import { FlightService } from 'src/app/_services/flight.service';
import { ReservationService } from 'src/app/_services/reservation.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent  {
  reservation:Reservation | undefined;
  flight:Flight | undefined
  @ViewChild('editForm') editForm: NgForm | undefined;
  userId:number
  idNumber:number

  constructor(private reservationService:ReservationService ,private flightService:FlightService,
    private route:ActivatedRoute,
    private router:Router,private toastr:ToastrService,private accountService:AccountService,private approvedHub:ApprovedhubService) {}

  ngOnInit(): void {

    this.approvedHub.startConnection();
    var id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
     this.idNumber = +id;
    this.flightService.getFlight(this.idNumber).subscribe({
      next: flight => {
        this.flight = flight;
       
      }})
    

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user =>{
        if(user){
          this.userId = user.userId;
        }
      }
    });


  }


addReservation(data:any)
  {
   
   
    var rS:number=data.reservedSeats;

   

    const r:Reservation={
      flightId:this.idNumber,
      userId:this.userId,
      reservedSeats:rS,
      status:false
    }
    try {
    
    
      const currentDate = new Date();
      const flightDate =new Date(this.flight.date);
      const differenceInDays = Math.floor((currentDate.getTime() - flightDate.getTime()) / (1000 * 60 * 60 * 24));

      if (differenceInDays < 3) {
        this.toastr.error("Reservation is less than 3 days from the current date.");
      } else {
        this.approvedHub.addReservation(r);
        this.router.navigateByUrl('allFlight')
      }
   
    
  } catch (error) {
   this.toastr.error('An error occurred:', error);
   
  }
  }
 
}

