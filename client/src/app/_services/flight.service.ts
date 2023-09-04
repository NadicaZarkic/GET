import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flight } from '../_models/flight';
import { Data } from '@angular/router';
import { FlightParams } from '../_models/flightParams';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  baseUrl = 'https://localhost:5001/api/'
  flightParams: FlightParams | undefined;
  flight: Flight | undefined;
  memberCache = new Map();

  constructor(private http: HttpClient) 
  { 

    this.flightParams = new FlightParams();

  }

  getFlights()
{
  return this.http.get<Flight[]>(this.baseUrl + 'flight/');
}

addFlight(flight:Flight)
{
  return this.http.post(this.baseUrl + 'flight', flight);

}

getFlight(id:number)
{
  return this.http.get<Flight>(this.baseUrl + 'flight/'+id);
}


updateFlight(flight:Flight)
{
  
  return this.http.put(this.baseUrl + 'flight', flight);
}


getFlightParams() {
    
   
  return this.flightParams;
}

setFlightParams(params: FlightParams) {
  this.flightParams = params;
}

resetFlightParams() {
  if (this.flight) {
    this.flightParams = new FlightParams();
    return this.flightParams;
  }
  else
  this.flightParams = new FlightParams();
   return this.flightParams;
}

getSearchFlights(flightParams: FlightParams) {
    
  // const response = this.memberCache.get(Object.values(flightParams).join('-'));

  // if (response) return of(response);

    let params= new HttpParams();
    
    params = params.append('PlaceOfArrival', flightParams.placeOfArrival);
    params = params.append('PlaceOfDeparture', flightParams.placeOfDeparture);
     params = params.append('Transfers', flightParams.transfers);
    

    return this.http.get<Flight[]>(this.baseUrl + 'flight/getfilter?'+ params).pipe(
      map(response => {
        this.memberCache.set(Object.values(flightParams).join('-'), response);
        return response;
      })
  )
}


}


