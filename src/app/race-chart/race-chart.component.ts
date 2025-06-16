import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { SHAPERS_COLOR_PALETTE } from '../shapers-theme';

@Component({
  selector: 'app-race-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './race-chart.component.html'
})
export class RaceChartComponent implements OnInit {
  chartOptions$: Observable<EChartsOption> = new Observable<EChartsOption>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.chartOptions$ = this.dataService.getRaceData().pipe(
      map(data => {
        return {
          title: {
            text: 'Autodeclaração Racial',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          color: SHAPERS_COLOR_PALETTE, // 2. Aplique a paleta aqui
          series: [
            {
              name: 'Autodeclaração',
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
            }
          ],
        };
      })
    );
  }
}
