import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

export interface BudgetMensuel {
  totalRevenus: number;
  totalDepenses: number;
  totalLoisir: number;
  totalEpargne: number;
  besoins: number;
  loisirs: number;
  epargne: number;
  montantAInvestir: number;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://localhost:8080/api/budget';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  private get userEmail(): string | null {
    return this.authService.currentUserEmail;
  }

  getBudgetMensuel(currentUser: Observable<any>): Observable<BudgetMensuel> {
    return this.http.get<BudgetMensuel>(`${this.apiUrl}/mensuel/${this.userEmail}`).pipe(
      tap(budget => this.verifierAlertes(budget)),
      catchError(this.handleError)
    );
  }

  private verifierAlertes(budget: BudgetMensuel): void {
    const pourcentageDepense = (budget.totalDepenses / budget.besoins) * 100;
    const jourActuel = new Date().getDate();
    const moitieDuMois = 15;

    if (jourActuel <= moitieDuMois && pourcentageDepense >= 75) {
      this.afficherAlerte("Attention ! Vous avez déjà dépensé 75% de votre budget mensuel dans la première moitié du mois.", 'warning');
    }

    if (pourcentageDepense >= 100) {
      this.afficherAlerte("Alerte ! Vous avez dépassé 100% de votre budget mensuel.", 'error');
    }
  }

  private afficherAlerte(message: string, type: 'success' | 'info' | 'warning' | 'error'): void {
    this.notificationService.showNotification(message, type);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur ${error.status}, ` + `message: ${error.message}`;
    }
    console.error(errorMessage);
    this.notificationService.showNotification(errorMessage, 'error');
    return throwError(() => new Error(errorMessage));
  }
}