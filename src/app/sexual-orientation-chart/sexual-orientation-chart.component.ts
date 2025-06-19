import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EChartsOption } from 'echarts';
import { SHAPERS_COLOR_PALETTE } from '../shapers-theme';

@Component({
  selector: 'app-sexual-orientation-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  template: `<div
      echarts
      [options]="(chartOptions$ | async)!"
      class="chart-container"
    ></div>

    <div class="analysis-text">
      <p>
        <strong>Tendência e Insight:</strong> Este gráfico de rosca exibe a
        diversidade de orientações afetivo-sexuais autodeclaradas pelos membros.
        Os dados indicam uma comunidade plural, onde, embora a orientação
        <strong>Heterossexual</strong> seja a mais numerosa, há uma
        representatividade expressiva de orientações
        <strong>Bissexual, Homossexual e Pansexual</strong>. A presença de
        membros que se identificam como <strong>Assexuais</strong> completa o
        panorama, demonstrando a complexidade da rede. A visibilidade da
        comunidade LGBTQIA+ é um forte indicativo de um ambiente que busca ser
        seguro e inclusivo, reforçando a importância de continuar promovendo
        espaços de diálogo e representatividade.
      </p>
      <p>
        <strong>Insights Estratégicos:</strong> A visibilidade da comunidade
        LGBTQIA+ é um forte indicativo de um ambiente que busca ser seguro e
        inclusivo. Este dado reforça a importância de continuar promovendo
        espaços de diálogo e representatividade, garantindo que as pautas e
        projetos da comunidade contemplem a diversidade de experiências e
        perspectivas de todos os seus membros.
      </p>
    </div> `,
})
export class SexualOrientationChartComponent implements OnInit {
  chartOptions$: Observable<EChartsOption> = new Observable<EChartsOption>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.chartOptions$ = this.dataService.getSexualOrientationData().pipe(
      map((data) => ({
        title: { text: 'Orientação Afetivo-Sexual', left: 'center' },
        tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
        legend: { orient: 'vertical', left: 10, top: 40 },
        color: SHAPERS_COLOR_PALETTE,
        series: [
          {
            name: 'Orientação',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['65%', '50%'],
            avoidLabelOverlap: true,
            label: { show: false },
            labelLine: { show: false },
            data: data,
            emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
          },
        ],
      }))
    );
  }
}
