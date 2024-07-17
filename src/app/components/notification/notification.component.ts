import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppNotification, NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notification: AppNotification | null = null;
  private subscription: Subscription | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.notifications$.subscribe(
      notification => {
        this.notification = notification;
        setTimeout(() => this.notification = null, 10000);
      }
    );
  }

  

  get notificationClasses(): { [key: string]: boolean } {
    if (!this.notification) return {};
    return {
      'notification': true,
      [this.notification.type]: true
    };
  }
}