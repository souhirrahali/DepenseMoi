import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // Adjust this URL as needed

  constructor(private http: HttpClient) { }

  getUser(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${email}`);
  }

  updateUser(email: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${email}/update`, user);
  }

  deleteUser(email: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${email}/delete`, { responseType: 'text' });
  }

  changePassword(email: string, currentPassword: string, newPassword: string): Observable<string> {
    const passwordChangeRequest = { currentPassword, newPassword };
    return this.http.put(`${this.apiUrl}/${email}/change-password`, passwordChangeRequest, { responseType: 'text' });
  }
}