import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { SHAPERS_COLOR_PALETTE } from '../shapers-theme';

@Component({
  selector: 'app-education-level-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './education-level-chart.component.html'
})
export class EducationLevelChartComponent implements OnInit {
  chartOptions$: Observable<EChartsOption> = new Observable<EChartsOption>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.chartOptions$ = this.dataService.getEducationLevel().pipe(
      map(data => {
        // Para o gráfico horizontal, o eixo Y é a categoria e o X é o valor
        return {
          title: {
            text: 'Nível de Formação',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: data.map(item => item.name).reverse()
          },
          series: [
            {
              name: 'Quantidade',
              type: 'bar',
              data: data.map(item => item.value).reverse(),
              color: SHAPERS_COLOR_PALETTE[0]
            }
          ]
        };
      })
    );
  }
}
