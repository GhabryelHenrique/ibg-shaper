import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsChartComponent } from './documents-chart.component';

describe('DocumentsChartComponent', () => {
  let component: DocumentsChartComponent;
  let fixture: ComponentFixture<DocumentsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
