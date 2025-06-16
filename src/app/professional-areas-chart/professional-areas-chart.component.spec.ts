import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalAreasChartComponent } from './professional-areas-chart.component';

describe('ProfessionalAreasChartComponent', () => {
  let component: ProfessionalAreasChartComponent;
  let fixture: ComponentFixture<ProfessionalAreasChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalAreasChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalAreasChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
