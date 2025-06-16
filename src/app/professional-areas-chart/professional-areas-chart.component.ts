import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { SHAPERS_COLOR_PALETTE } from '../shapers-theme';

@Component({
  selector: 'app-professional-areas-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule,], // Importe os módulos necessários aqui
  templateUrl: './professional-areas-chart.component.html',
})
export class ProfessionalAreasChartComponent implements OnInit {
  chartOptions$: Observable<EChartsOption> = new Observable<EChartsOption>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.chartOptions$ = this.dataService.getGroupedProfessionalAreas().pipe(
      map(data => {
        return {
          title: {
            text: 'Áreas de Atuação Profissional',
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
          xAxis: [
            {
              type: 'category',
              data: data.map(item => item.name),
              axisLabel: {
                interval: 0,
                rotate: 20 // Rotaciona os labels para não sobrepor
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'Quantidade'
            }
          ],
          series: [
            {
              name: 'Quantidade',
              type: 'bar',
              barWidth: '60%',
              data: data.map((item, index) => ({
                value: item.value,
                itemStyle: {
                  // 2. Usamos a paleta importada
                  color: SHAPERS_COLOR_PALETTE[index % SHAPERS_COLOR_PALETTE.length]
                }
              }))
            }
          ]
        };
      })
    );
  }
}
