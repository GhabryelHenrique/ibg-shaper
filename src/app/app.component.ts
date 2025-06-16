import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// 1. Importe o NgxEchartsModule

// Importe os componentes dos gráficos
import { AgeChartComponent } from './age-chart/age-chart.component';
import { EducationLevelChartComponent } from './education-level-chart/education-level-chart.component';
import { GenderIdentityChartComponent } from './gender-identity-chart/gender-identity-chart.component';
import { HubChartComponent } from './hub-chart/hub-chart.component';
import { MaritalStatusChartComponent } from './marital-status-chart/marital-status-chart.component';
import { ProfessionalAreasChartComponent } from './professional-areas-chart/professional-areas-chart.component';
import { RaceChartComponent } from './race-chart/race-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    // 2. Adicione o NgxEchartsModule aqui
    ProfessionalAreasChartComponent,
    GenderIdentityChartComponent,
    RaceChartComponent,
     HubChartComponent,
    AgeChartComponent,
    MaritalStatusChartComponent,
    EducationLevelChartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cha-ghabryel';
}
