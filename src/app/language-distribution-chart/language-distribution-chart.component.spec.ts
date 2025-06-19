import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageDistributionChartComponent } from './language-distribution-chart.component';

describe('LanguageDistributionChartComponent', () => {
  let component: LanguageDistributionChartComponent;
  let fixture: ComponentFixture<LanguageDistributionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageDistributionChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageDistributionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
