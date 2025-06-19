import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaithChartComponent } from './faith-chart.component';

describe('FaithChartComponent', () => {
  let component: FaithChartComponent;
  let fixture: ComponentFixture<FaithChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaithChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaithChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
