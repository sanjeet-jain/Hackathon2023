import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonFootprintCalculatorComponent } from './carbon-footprint-calculator.component';

describe('CarbonFootprintCalculatorComponent', () => {
  let component: CarbonFootprintCalculatorComponent;
  let fixture: ComponentFixture<CarbonFootprintCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarbonFootprintCalculatorComponent]
    });
    fixture = TestBed.createComponent(CarbonFootprintCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
