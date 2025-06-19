import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EChartsOption } from 'echarts';
import { SHAPERS_COLOR_PALETTE } from '../shapers-theme';

@Component({
  selector: 'app-hobbies-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './hobbies-chart.component.html',
})
export class HobbiesChartComponent implements OnInit {
  chartOptions$: Observable<EChartsOption> = new Observable<EChartsOption>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.chartOptions$ = this.dataService.getHobbiesData().pipe(
      map(data => ({
        title: {
          text: 'Hobbies e Interesses Mais Comuns',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: { type: 'value' },
        yAxis: {
          type: 'category',
          data: data.map(item => item.name).reverse(),
        },
        series: [{
          name: 'Nº de Membros',
          type: 'bar',
          data: data.map(item => item.value).reverse(),
          color: SHAPERS_COLOR_PALETTE[2], // Usando a cor laranja da paleta
        }],
      }))
    );
  }
}
