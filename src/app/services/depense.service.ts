import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';



export interface Depense {
  id: number;
  titre: string;
  description: string;
  categorie: string;
  date: string;
  montant: number;
}

@Injectable({
  providedIn: 'root'
})
export class DepenseService {
  private apiUrl = 'http://localhost:8080/api/depense';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private get userEmail(): string | null {
    return this.authService.currentUserEmail;
  }

  addDepense(depense: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/${this.userEmail}`, depense);
  }

  getDepenseById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/${this.userEmail}`);
  }

  updateDepense(id: number, depense: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/${this.userEmail}`, depense);
  }

  deleteDepense(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/${this.userEmail}`);
  }

  getAllDepenses(email: string|null): Observable<Depense[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all/${this.userEmail}`)
    ;
  }
}
