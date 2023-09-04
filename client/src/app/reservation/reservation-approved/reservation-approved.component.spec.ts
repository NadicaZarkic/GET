import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationApprovedComponent } from './reservation-approved.component';

describe('ReservationApprovedComponent', () => {
  let component: ReservationApprovedComponent;
  let fixture: ComponentFixture<ReservationApprovedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationApprovedComponent]
    });
    fixture = TestBed.createComponent(ReservationApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
