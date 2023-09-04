import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlightListComponent } from './flight/flight-list/flight-list.component';
import { FlightInsertComponent } from './flight/flight-insert/flight-insert.component';
import { FlightCancelComponent } from './flight/flight-cancel/flight-cancel.component';
import { authGuard } from './_guards/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { MyreservationListComponent } from './reservation/myreservation-list/myreservation-list.component';
import { FlightDetailComponent } from './flight/flight-detail/flight-detail.component';
import { FlightSearchComponent } from './flight/flight-search/flight-search.component';
import { adminGuard } from './_guards/admin.guard';
import { agentGuard } from './_guards/agent.guard';
import { viewerGuard } from './_guards/viewer.guard';
import { ReservationApprovedComponent } from './reservation/reservation-approved/reservation-approved.component';
import { BookFlightComponent } from './reservation/book-flight/book-flight.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', 
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {path: 'allFlight', component: FlightListComponent},
      {path: 'insertFlight', component: FlightInsertComponent,canActivate:[agentGuard]},
      {path: 'cancelFlight/:id', component: FlightCancelComponent,canActivate:[adminGuard]},
      {path: 'addUser', component: AddUserComponent,canActivate:[adminGuard]},
      {path: 'myReservations', component: MyreservationListComponent,canActivate:[viewerGuard]},
      {path:'flightDetail/:id',component:FlightDetailComponent,canActivate:[viewerGuard]},
      {path:'flightSearch',component:FlightSearchComponent,canActivate:[viewerGuard]},
      {path:'reservationApproved',component:ReservationApprovedComponent,canActivate:[agentGuard]},
      {path:'bookFlight/:id',component:BookFlightComponent,canActivate:[viewerGuard]}
    ]
   
  },
  {path: 'errors', component: TestErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
