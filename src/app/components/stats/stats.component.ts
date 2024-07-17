import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  stats: any;
  chartData!: ChartConfiguration['data'];
  chartOptions!: ChartConfiguration['options'];
  userEmail: string;

  constructor(private statsService: StatsService) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userEmail = currentUser.email || '';
  }

  ngOnInit() {
    if (this.userEmail) {
      this.getStats();
      this.getChartData();
    } else {
      console.error('Aucun utilisateur connecté trouvé dans le localStorage');
    }
  }

  getStats() {
    this.statsService.getStats(this.userEmail).subscribe(
      (data) => {
        this.stats = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des stats:', error);
      }
    );
  }

  getChartData() {
    this.statsService.getChartData(this.userEmail).subscribe(
      (data) => {
        this.prepareChartData(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données du graphique:', error);
      }
    );
  }

  prepareChartData(data: any) {
    const dates = [...new Set([...data.listeDepenses.map((d: any) => d.date), ...data.listeRevenus.map((r: any) => r.date)])].sort();

    const depensesData = dates.map(date => {
      const depense = data.listeDepenses.find((d: any) => d.date === date);
      return depense ? depense.montant : 0;
    });

    const revenusData = dates.map(date => {
      const revenu = data.listeRevenus.find((r: any) => r.date === date);
      return revenu ? revenu.montant : 0;
    });

    this.chartData = {
      labels: dates,
      datasets: [
        { data: depensesData, label: 'Dépenses', borderColor: '#FF6384', fill: true },
        { data: revenusData, label: 'Revenus', borderColor: '#36A2EB', fill: true }
      ]
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: { display: true, text: 'Dépenses et Revenus' }
      }
    };
  }
}
