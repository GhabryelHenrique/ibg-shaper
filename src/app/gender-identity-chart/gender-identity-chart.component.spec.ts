import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderIdentityChartComponent } from './gender-identity-chart.component';

describe('GenderIdentityChartComponent', () => {
  let component: GenderIdentityChartComponent;
  let fixture: ComponentFixture<GenderIdentityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenderIdentityChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderIdentityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
