import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { SHAPERS_COLOR_PALETTE } from '../shapers-theme';

@Component({
  selector: 'app-gender-identity-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './gender-identity-chart.component.html',
})
export class GenderIdentityChartComponent implements OnInit {
  chartOptions$: Observable<EChartsOption> = new Observable<EChartsOption>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.chartOptions$ = this.dataService.getGenderIdentity().pipe(
      map(data => {
        return {
          title: {
            text: 'Identificação de Gênero',
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
              name: 'Gênero',
              type: 'pie',
              radius: '65%',
              data: data, // O formato {name, value} já é o padrão para pizza
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
      })
    );
  }
}
