import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

export interface Revenu {
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
export class RevenuService {
  private apiUrl = 'http://localhost:8080/api/revenu';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private get userEmail(): string | null {
    return this.authService.currentUserEmail;
  }

  addRevenu(revenu: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/${this.userEmail}`, revenu);
  }

  getRevenuById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/${this.userEmail}`);
  }

  updateRevenu(id: number, revenu: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/${this.userEmail}`, revenu);
  }
  deleteRevenu(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/${this.userEmail}`);
  }

  getAllRevenus(email: string|null): Observable<Revenu[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all/${this.userEmail}`)
    ;
  }


}
