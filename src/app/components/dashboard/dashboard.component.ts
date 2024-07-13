import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
/*   constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  } */
    stats: any;
    chartData: any;
    error: string = '';
  
    constructor(
      private statsService: StatsService,
      private authService: AuthService
    ) { }
  
    ngOnInit(): void {
      this.loadStats();
      this.loadChartData();
    }
  
    loadStats(): void {
      const email = this.authService.currentUserEmail;
      if (email) {
        this.statsService.getStats(email).subscribe(
          (data) => {
            this.stats = data;
          },
          (error) => {
            this.error = 'Erreur lors du chargement des statistiques';
            console.error('Erreur lors du chargement des statistiques', error);
          }
        );
      }
    }
  
    loadChartData(): void {
      const email = this.authService.currentUserEmail;
      if (email) {
        this.statsService.getChartData(email).subscribe(
          (data) => {
            this.chartData = data;
          },
          (error) => {
            this.error = 'Erreur lors du chargement des données du graphique';
            console.error('Erreur lors du chargement des données du graphique', error);
          }
        );
      }
    }
  }


