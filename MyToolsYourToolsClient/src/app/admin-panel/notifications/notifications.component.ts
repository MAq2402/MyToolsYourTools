import { Component, OnInit } from '@angular/core';
import { Notification } from '../../models/Notification';
import { NotificationType } from '../../enums/NotificationType';
import { NotificationService } from '../../services/notification.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  currentUserId: string;

  rentRequests: Notification[];
  opinions: Notification[];

  constructor(
    private notificationService: NotificationService // nie lepiej zawrzeć to w UserService?
  ) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('auth_key');
    let allUserNotifications: Notification[];
    this.notificationService.getUserNotifications(this.currentUserId)
      .pipe(
        tap(allUserNotifications => {
          this.rentRequests = allUserNotifications.filter(n => n.type === NotificationType.rentRequest);
          this.opinions = allUserNotifications.filter(n => n.type === NotificationType.opinion);
        })
      )
      .subscribe();
      console.log(this.notificationService.getUserNotifications(this.currentUserId));
    /*this.rentRequests = allUserNotifications.filter(n => n.type === NotificationType.rentRequest);
    this.opinions = allUserNotifications.filter(n => n.type === NotificationType.opinion);*/

  }
  onRequestNotificationApproved(event: any){

    this.rentRequests = this.rentRequests.filter(n => n.id !== event.currentTarget.id);
    this.notificationService.deleteNotification(event.currentTarget.id);

  }
  onRequestNotificationRejected(event: any){

    this.rentRequests = this.rentRequests.filter(n => n.id !== event.currentTarget.id);
    this.notificationService.deleteNotification(event.currentTarget.id);

  }
  onOpinionSent(event: any){

    this.opinions = this.opinions.filter(n => n.id !== event.currentTarget.id);
    this.notificationService.deleteNotification(event.currentTarget.id);

  }

}
