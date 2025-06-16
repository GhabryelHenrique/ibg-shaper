import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { SHAPERS_COLOR_PALETTE } from '../shapers-theme';

@Component({
  selector: 'app-hub-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './hub-chart.component.html'
})
export class HubChartComponent implements OnInit {
  chartOptions$: Observable<EChartsOption> = new Observable<EChartsOption>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.chartOptions$ = this.dataService.getHubData().pipe(
      map(data => ({
        title: { text: 'Distribuição por Hub', left: 'center' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'value' },
        yAxis: {
          type: 'category',
          data: data.map(item => item.name).reverse(), // Revertido para ordem crescente
        },
        series: [{
          name: 'Membros',
          type: 'bar',
          data: data.map(item => item.value).reverse(), // Revertido para ordem crescente
          color: SHAPERS_COLOR_PALETTE[0]
        }]
      }))
    );
  }
}
