import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { FlightService } from 'src/app/_services/flight.service';

@Component({
  selector: 'app-flight-insert',
  templateUrl: './flight-insert.component.html',
  styleUrls: ['./flight-insert.component.css']
})
export class FlightInsertComponent {

  flightInsertForm: FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  validationErrors: string[] | undefined;
  City: any = ['Beograd', 'Nis', 'Kraljevo', 'Pristina'];


  constructor(private fb: FormBuilder, private flightService:FlightService,private router:Router,
    private toastr:ToastrService)
  {
    
  }

  ngOnInit(): void {
  
    this.initializeForm();
  }

 
  

  initializeForm() {
    this.flightInsertForm = this.fb.group({
      placeOfDeparture: ['', Validators.required],
      placeOfArrival: ['', Validators.required],
      date: ['', Validators.required],
      transfers: ['', Validators.required],
      seats:['',Validators.required],
     
     
    });
   
  }

  add() {
    const values = {...this.flightInsertForm.value}
    this.flightService.addFlight(values).subscribe({
      next: () => {
          this.toastr.show("You have successfully added a flight");
          this.router.navigateByUrl('/allFlight')
      
        
      },
      error: error => {
        this.validationErrors = error
      } 
    })
  }
}
