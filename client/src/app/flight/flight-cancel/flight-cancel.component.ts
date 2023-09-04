import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Flight } from 'src/app/_models/flight';
import { FlightService } from 'src/app/_services/flight.service';

@Component({
  selector: 'app-flight-cancel',
  templateUrl: './flight-cancel.component.html',
  styleUrls: ['./flight-cancel.component.css']
})
export class FlightCancelComponent {

  flight:Flight | undefined;
  @ViewChild('editForm') editForm: NgForm | undefined;

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

updateFlight(data:any)
  {
    if(this.flight){
    this.flight.date = data.dataValue;
    this.flightService.updateFlight(this.flight).subscribe({
      next: _ => {
        this.toastr.success('Flight updated successfully');
        this.router.navigateByUrl('/allFlight')
      }
    })
  }
  }



}

