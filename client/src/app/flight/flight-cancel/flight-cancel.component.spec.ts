import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCancelComponent } from './flight-cancel.component';

describe('FlightCancelComponent', () => {
  let component: FlightCancelComponent;
  let fixture: ComponentFixture<FlightCancelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightCancelComponent]
    });
    fixture = TestBed.createComponent(FlightCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
