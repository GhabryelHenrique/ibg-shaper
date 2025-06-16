import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubChartComponent } from './hub-chart.component';

describe('HubChartComponent', () => {
  let component: HubChartComponent;
  let fixture: ComponentFixture<HubChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HubChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
