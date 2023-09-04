import { Component, OnDestroy } from '@angular/core';
import { take } from 'rxjs';
import { Flight } from 'src/app/_models/flight';
import { User } from 'src/app/_models/user';
import { ApprovedhubService } from 'src/app/_service/approvedhub.service';
import { AccountService } from 'src/app/_services/account.service';
import { FlightService } from 'src/app/_services/flight.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnDestroy {

  roleId:number | undefined;
  flights: Flight[] | undefined;
  user:User|undefined;


  constructor(private flightService: FlightService, private accountService:AccountService,
    public presenceService:PresenceService,private approvedHub:ApprovedhubService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user =>{
        if(user){
          this.roleId = user.roleId;
          user=user;
        }
      }
    });

    this.loadFlights();
  }

  loadFlights() {
    this.flightService.getFlights().subscribe({
      next: response => {
        this.flights = response;
    
      }
    })
  }

  ngOnDestroy(): void {
    this.approvedHub.stopConnection();
  }
}
