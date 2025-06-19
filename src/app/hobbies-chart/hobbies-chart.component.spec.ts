import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbiesChartComponent } from './hobbies-chart.component';

describe('HobbiesChartComponent', () => {
  let component: HobbiesChartComponent;
  let fixture: ComponentFixture<HobbiesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HobbiesChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HobbiesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
