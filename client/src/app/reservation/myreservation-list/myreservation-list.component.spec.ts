import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyreservationListComponent } from './myreservation-list.component';

describe('MyreservationListComponent', () => {
  let component: MyreservationListComponent;
  let fixture: ComponentFixture<MyreservationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyreservationListComponent]
    });
    fixture = TestBed.createComponent(MyreservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
