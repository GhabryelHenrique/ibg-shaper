import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationLevelChartComponent } from './education-level-chart.component';

describe('EducationLevelChartComponent', () => {
  let component: EducationLevelChartComponent;
  let fixture: ComponentFixture<EducationLevelChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationLevelChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationLevelChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
