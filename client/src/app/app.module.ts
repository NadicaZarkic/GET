import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FlightListComponent } from './flight/flight-list/flight-list.component';
import { FlightInsertComponent } from './flight/flight-insert/flight-insert.component';
import { ReservationApprovedComponent } from './reservation/reservation-approved/reservation-approved.component';
import { FlightCancelComponent } from './flight/flight-cancel/flight-cancel.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { MyreservationListComponent } from './reservation/myreservation-list/myreservation-list.component';
import { FlightDetailComponent } from './flight/flight-detail/flight-detail.component';
import { FlightSearchComponent } from './flight/flight-search/flight-search.component';
import { BookFlightComponent } from './reservation/book-flight/book-flight.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    TextInputComponent,
    FlightListComponent,
    FlightInsertComponent,
    ReservationApprovedComponent,
    FlightCancelComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    AddUserComponent,
    MyreservationListComponent,
    FlightDetailComponent,
    FlightSearchComponent,
    BookFlightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
   
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
