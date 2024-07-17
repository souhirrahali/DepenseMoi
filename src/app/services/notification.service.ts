import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppNotification {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<AppNotification>();

  notifications$ = this.notificationSubject.asObservable();

  showNotification(message: string, type: 'success' | 'info' | 'warning' | 'error') {
    this.notificationSubject.next({ message, type });
  }
}