import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { dados } from '../assets/dados';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private areaGroupMap: { [key: string]: string } = {
    'Tecnologia da Informação / Produtos Digitais / Desenvolvimento de Software': 'Tecnologia e Produtos Digitais',
    'Marketing e Publicidade': 'Comunicação e Marketing',
    'Mídia e Comunicação': 'Comunicação e Marketing',
    'Educação': 'Educação e Pesquisa',
    'Docência': 'Educação e Pesquisa',
    'Consultoria': 'Consultoria e Negócios',
    'ESG': 'Consultoria e Negócios',
    'Finanças': 'Finanças e Economia',
    'Governo e Setor Público': 'Setor Público',
    'Saúde e Bem-estar': 'Saúde e Bem-estar',
    'Artes e Entretenimento': 'Artes e Cultura',
    'Arquitetura': 'Arquitetura e Urbanismo',
    'Habitação Social e Urbanismo Inclusivo': 'Arquitetura e Urbanismo',
    'Jurídica': 'Jurídico e Leis',
    'Direito': 'Jurídico e Leis',
  };

  constructor() { }

  private getData(): Observable<any[]> {
    return of(dados.filter(dado => dado.Timestamp));
  }

  // Método genérico para processar e contar dados
  private processData(data: any[], key: string): { name: string, value: number }[] {
    const counts = data.reduce((acc, curr) => {
      const value = curr[key];
      if (value) {
        acc[value] = (acc[value] || 0) + 1;
      }
      return acc;
    }, {} as { [key: string]: number });

    // Ordena os resultados do maior para o menor
    return Object.keys(counts)
      .map(k => ({ name: k, value: counts[k] }))
      .sort((a, b) => b.value - a.value);
  }

  // ---- MÉTODOS PARA OS GRÁFICOS ----

  // NOVO: Processa os dados de autodeclaração racial
  getRaceData(): Observable<any[]> {
    return this.getData().pipe(
      map(data => {
        const raceData = data.map(item => {
          let race = item['Você se autodeclara uma pessoa:'] || 'Não informado';
          if (race.includes('Negra') || race.includes('Parda') || race.includes('Pardo')) {
            race = 'Pessoa Negra';
          } else if (race.includes('Branca')) {
            race = 'Pessoa Branca';
          } else if (race.includes('Amarela')) {
            race = 'Pessoa Amarela';
          } else if (race.includes('Prefiro') || race.includes('ofensivo') || race.includes('Mestiza')) {
            race = 'Não informado/Outros';
          }
          return { ...item, 'Você se autodeclara uma pessoa:': race };
        });
        return this.processData(raceData, 'Você se autodeclara uma pessoa:');
      })
    );
  }

  // ATUALIZADO: Agrupa áreas de atuação
  getGroupedProfessionalAreas(): Observable<any[]> {
    return this.getData().pipe(
      map(data => {
        const dataWithGroupedAreas = data.map(item => {
          let professionalArea = item['Área de atuação profissional'] || 'Não Informado';
          // Se houver múltiplas áreas, considera a primeira
          const firstArea = professionalArea.split(',')[0].trim();
          const group = this.areaGroupMap[firstArea] || 'Outras Áreas';
          return { ...item, 'Área de atuação profissional': group };
        });
        return this.processData(dataWithGroupedAreas, 'Área de atuação profissional');
      })
    );
  }

  getGenderIdentity(): Observable<any[]> {
    return this.getData().pipe(
      map(data => this.processData(data, 'Idenficação de gênero'))
    );
  }

  getEducationLevel(): Observable<any[]> {
    return this.getData().pipe(
      map(data => this.processData(data, 'Nível de Formação'))
    );
  }

   // 1. NOVO: Processa dados de Hubs
  getHubData(): Observable<any[]> {
    return this.getData().pipe(
      map(data => this.processData(data.filter(item => item['Qual o seu Hub?']), 'Qual o seu Hub?'))
    );
  }

  // 2. NOVO: Processa dados de Estado Civil
  getMaritalStatusData(): Observable<any[]> {
    return this.getData().pipe(
      map(data => this.processData(data, 'Estado civil'))
    );
  }

  // 3. NOVO: Processa dados para criar faixas etárias
  getAgeGroupData(): Observable<any[]> {
    return this.getData().pipe(
      map(data => {
        const ageGroups = {
          '18-24': 0,
          '25-29': 0,
          '30-34': 0,
          '35+': 0,
          'Inválido': 0
        };

        const currentYear = new Date().getFullYear();

        data.forEach(item => {
          const dobString = item['Data de nascimento'];
          if (!dobString) {
            ageGroups['Inválido']++;
            return;
          }

          const parts = dobString.split('/');
          if (parts.length !== 3) {
            ageGroups['Inválido']++;
            return;
          }

          let year = parseInt(parts[2], 10);
          // Converte ano com 2 dígitos para 4 dígitos
          if (year < 100) {
            year += (year > (currentYear % 100)) ? 1900 : 2000;
          }

          const month = parseInt(parts[0], 10) - 1;
          const day = parseInt(parts[1], 10);
          const birthDate = new Date(year, month, day);

          if (isNaN(birthDate.getTime())) {
            ageGroups['Inválido']++;
            return;
          }

          let age = currentYear - birthDate.getFullYear();
          const m = new Date().getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && new Date().getDate() < birthDate.getDate())) {
            age--;
          }

          if (age >= 18 && age <= 24) {
            ageGroups['18-24']++;
          } else if (age >= 25 && age <= 29) {
            ageGroups['25-29']++;
          } else if (age >= 30 && age <= 34) {
            ageGroups['30-34']++;
          } else if (age >= 35) {
            ageGroups['35+']++;
          } else {
            ageGroups['Inválido']++;
          }
        });

        return Object.keys(ageGroups)
          .filter(key => key !== 'Inválido' && ageGroups[key as keyof typeof ageGroups] > 0)
          .map(key => ({ name: key, value: ageGroups[key as keyof typeof ageGroups] }));
      })
    );
  }
}
