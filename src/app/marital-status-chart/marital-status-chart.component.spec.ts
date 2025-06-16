import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaritalStatusChartComponent } from './marital-status-chart.component';

describe('MaritalStatusChartComponent', () => {
  let component: MaritalStatusChartComponent;
  let fixture: ComponentFixture<MaritalStatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaritalStatusChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaritalStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
