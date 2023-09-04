import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Flight } from 'src/app/_models/flight';
import { FlightService } from 'src/app/_services/flight.service';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent {

  flight:Flight | undefined;
  
  constructor(private flightService:FlightService,private route:ActivatedRoute,
    private router:Router,private toastr:ToastrService) {}


    ngOnInit(): void {

      this.loadFlight()
    
      }
    
      loadFlight() {
        var id = this.route.snapshot.paramMap.get('id');
        if (!id) return;
        var idNumber:number = +id;
        this.flightService.getFlight(idNumber).subscribe({
          next: flight => {
            this.flight = flight;
           
          }
        })
    
    }

}
