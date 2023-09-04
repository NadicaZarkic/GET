import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataServiceService {

  private reservationStatusSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Pending');


  constructor() { }

  getReservationStatus(): Observable<string> {
    return this.reservationStatusSubject.asObservable();
  }

  updateReservationStatus(status: string): void {
    this.reservationStatusSubject.next(status);
  }
}
