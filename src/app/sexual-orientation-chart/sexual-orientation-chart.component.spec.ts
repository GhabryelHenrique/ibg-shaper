import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexualOrientationChartComponent } from './sexual-orientation-chart.component';

describe('SexualOrientationChartComponent', () => {
  let component: SexualOrientationChartComponent;
  let fixture: ComponentFixture<SexualOrientationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SexualOrientationChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SexualOrientationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
