import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { SHAPERS_COLOR_PALETTE } from '../shapers-theme';

@Component({
  selector: 'app-language-proficiency-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './language-distribution-chart.component.html',
})
export class LanguageProficiencyChartComponent implements OnInit {
  chartOptions$: Observable<EChartsOption> = new Observable<EChartsOption>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Usamos o novo método do serviço
    this.chartOptions$ = this.dataService.getLanguageProficiencyDetails().pipe(
      map(chartData => {
        // Mapeia os níveis para as cores da paleta, dando destaque aos mais fluentes
        const levelColorMap: { [key: string]: string } = {
          'Fluente/Nativo': SHAPERS_COLOR_PALETTE[1], // Dark Blue
          'Avançado': SHAPERS_COLOR_PALETTE[0],       // Teal
          'Intermediário': SHAPERS_COLOR_PALETTE[5],  // Light Teal
          'Básico': SHAPERS_COLOR_PALETTE[3],         // Yellow
        };

        // Aplica a cor correspondente a cada série
        const coloredSeries = chartData.series.map((s: any) => ({
          ...s,
          color: levelColorMap[s.name]
        }));

        return {
          title: {
            text: 'Níveis de Proficiência por Idioma',
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
            data: chartData.languages
          },
          yAxis: {
            type: 'value',
            name: 'Nº de Membros'
          },
          series: coloredSeries
        };
      })
    );
  }
}
