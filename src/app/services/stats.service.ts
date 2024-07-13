import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = 'http://localhost:8080/api/stats';

  constructor(private http: HttpClient) { }

  getStats(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${email}`);
  }

  getChartData(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/chart/${email}`);
  }
}