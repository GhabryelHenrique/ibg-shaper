import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { SHAPERS_COLOR_PALETTE } from '../shapers-theme';

@Component({
  selector: 'app-documents-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './documents-chart.component.html',
})
export class DocumentsChartComponent implements OnInit {
  chartOptions$: Observable<EChartsOption> = new Observable<EChartsOption>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.chartOptions$ = this.dataService.getDocumentFamiliarityData().pipe(
      map(chartData => {
        const levelColorMap: { [key: string]: string } = {
          'Conheço bastante': SHAPERS_COLOR_PALETTE[1], // Dark Blue
          'Já li': SHAPERS_COLOR_PALETTE[0],       // Teal
          'Já ouvi falar/sei que existe': SHAPERS_COLOR_PALETTE[3], // Yellow
          'Nunca ouvi falar': SHAPERS_COLOR_PALETTE[4], // Red
        };

        const coloredSeries = chartData.series.map((s: any) => ({
          ...s,
          color: levelColorMap[s.name],
        }));

        return {
          title: {
            text: 'Familiaridade com Documentos Oficiais',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
          },
          legend: {
            data: coloredSeries.map((s: any) => s.name),
            top: 'bottom'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: chartData.documents
          },
          yAxis: {
            type: 'value',
            name: 'Nº de Respostas'
          },
          series: coloredSeries,

        };
      })
    );
  }
}
