import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingListComponent } from './tracking-list.component';

describe('TrackingListComponent', () => {
  let component: TrackingListComponent;
  let fixture: ComponentFixture<TrackingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackingListComponent]
    });
    fixture = TestBed.createComponent(TrackingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
