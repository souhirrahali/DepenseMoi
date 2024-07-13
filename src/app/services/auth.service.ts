import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  public get currentUserEmail(): string | null {
    return this.currentUserValue?.email || null;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`http://localhost:8080/login`, { email, password })
      .pipe(map(response => {
        if (response && response.token) {
          const user = { email: email, token: response.token };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return response;
      }));
  }

  register(firstname: string, lastname: string, email: string, password: string) {
    return this.http.post<any>(`http://localhost:8080/register`, { firstname, lastname, email, password })
      .pipe(map(response => {
        if (response && response.token) {
          const user = { email: email, token: response.token };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return response;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}