import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BudgetMensuel, BudgetService, } from 'src/app/services/budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  budgetMensuel: BudgetMensuel | null = null;
  depensesPercentage: number = 0;
  loisirPercentage: number = 0;
  epargnePercentage: number = 0;
  depensesMensuelles: number = 0;
  restantBudget: number = 0;
  restantBesoins: number = 0;
  restantLoisirs: number = 0;
  restantEpargne: number = 0;

  constructor(private budgetService: BudgetService, public authService: AuthService) { }

  ngOnInit() {
    this.loadBudgetMensuel();
  }

  loadBudgetMensuel() {
    this.budgetService.getBudgetMensuel(this.authService.currentUser).subscribe({
      next: (data) => {
        this.budgetMensuel = data;
        this.calculatePercentages();
        this.calculateDepensesMensuelles();
        this.calculateRestants();
        console.log("Budget Mensuel chargé: ", this.budgetMensuel);
      },
      error: (error) => {
        console.error('Erreur lors du chargement du budget:', error);
      }
    });
  }

  calculatePercentages() {
    if (this.budgetMensuel) {
      this.depensesPercentage = (this.budgetMensuel.totalDepenses / this.budgetMensuel.besoins) * 100;
      this.loisirPercentage = (this.budgetMensuel.totalLoisir / this.budgetMensuel.loisirs) * 100;
      this.epargnePercentage = (this.budgetMensuel.totalEpargne / this.budgetMensuel.epargne) * 100;
    }
  }

  calculateDepensesMensuelles() {
    if (this.budgetMensuel) {
      this.depensesMensuelles = this.budgetMensuel.totalDepenses+ this.budgetMensuel.totalLoisir+ this.budgetMensuel.totalEpargne;
    }
  }

  calculateRestants() {
    if (this.budgetMensuel) {
      this.restantBudget = this.budgetMensuel.totalRevenus - this.depensesMensuelles;
      this.restantBesoins = this.budgetMensuel.besoins - this.budgetMensuel.totalDepenses;
      this.restantLoisirs = this.budgetMensuel.loisirs - this.budgetMensuel.totalLoisir;
      this.restantEpargne = this.budgetMensuel.epargne - this.budgetMensuel.totalEpargne;
    }
  }

  getCircleColor(category: 'besoins' | 'loisirs' | 'epargne'): string {
    switch (category) {
      case 'besoins':
        return '#FF6B6B';
      case 'loisirs':
        return '#4ECDC4';
      case 'epargne':
        return '#45B7D1';
      default:
        return '#000000';
    }
  }

  calculateStrokeDasharray(percentage: number): string {
    const circumference = 2 * Math.PI * 90;
    return `${(percentage / 100) * circumference} ${circumference}`;
  }
}