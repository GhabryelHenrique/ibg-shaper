import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { SHAPERS_COLOR_PALETTE } from '../shapers-theme';

@Component({
  selector: 'app-marital-status-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './marital-status-chart.component.html'
})
export class MaritalStatusChartComponent implements OnInit {
  chartOptions$: Observable<EChartsOption> = new Observable<EChartsOption>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.chartOptions$ = this.dataService.getMaritalStatusData().pipe(
      map(data => ({
        title: { text: 'Distribuição por Estado Civil', left: 'center' },
        tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
        color: SHAPERS_COLOR_PALETTE,
        series: [{
          name: 'Estado Civil',
          type: 'pie',
          radius: '70%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }))
    );
  }
}
