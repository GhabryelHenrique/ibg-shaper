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
import { SexualOrientationChartComponent } from './sexual-orientation-chart/sexual-orientation-chart.component';
import { LanguageProficiencyChartComponent } from './language-distribution-chart/language-distribution-chart.component';
import { HobbiesChartComponent } from './hobbies-chart/hobbies-chart.component';
import { DocumentsChartComponent } from './documents-chart/documents-chart.component';
import { FaithChartComponent } from './faith-chart/faith-chart.component';

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
    HobbiesChartComponent,
    EducationLevelChartComponent,
    SexualOrientationChartComponent,
    FaithChartComponent,
    DocumentsChartComponent,
    LanguageProficiencyChartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
