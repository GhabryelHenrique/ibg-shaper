import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { SHAPERS_COLOR_PALETTE } from '../shapers-theme';

@Component({
  selector: 'app-age-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './age-chart.component.html'
})
export class AgeChartComponent implements OnInit {
  chartOptions$: Observable<EChartsOption> = new Observable<EChartsOption>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.chartOptions$ = this.dataService.getAgeGroupData().pipe(
      map(data => ({
        title: { text: 'Distribuição por Faixa Etária', left: 'center' },
        tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
        legend: { top: 'bottom' },
        color: SHAPERS_COLOR_PALETTE,
        series: [{
          name: 'Faixa Etária',
          type: 'pie',
          radius: ['40%', '70%'], // Estilo "Doughnut"
          avoidLabelOverlap: true,
          label: { show: false, position: 'center' },
          emphasis: {
            label: { show: true, fontSize: 30, fontWeight: 'bold' }
          },
          labelLine: { show: false },
          data: data
        }]
      }))
    );
  }
}
