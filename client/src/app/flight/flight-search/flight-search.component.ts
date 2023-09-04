import { Component, OnDestroy } from '@angular/core';
import { Flight } from 'src/app/_models/flight';
import { FlightParams } from 'src/app/_models/flightParams';
import { FlightService } from 'src/app/_services/flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent  {

  flights: Flight[] = [];
  flightParams: FlightParams | undefined;
  City: any = ['Beograd', 'Nis', 'Kraljevo', 'Pristina'];

  constructor(private flightService: FlightService) 
  { 
     this.flightParams = this.flightService.getFlightParams();
  }


  ngOnInit(): void {
    this.loadFlights();
  }

  
  loadFlights() {
    if (this.flightParams) {
      this.flightService.setFlightParams(this.flightParams);
      this.flightService.getSearchFlights(this.flightParams).subscribe({
        next: response => {
          if (response) {
            this.flights = response;
          
          }
        }
      })
    }
  }

  resetFilters() {
    this.flightParams = this.flightService.resetFlightParams();
    this.loadFlights();
  }

 
}
