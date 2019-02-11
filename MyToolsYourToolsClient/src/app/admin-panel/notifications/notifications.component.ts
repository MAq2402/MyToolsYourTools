import { Component, OnInit } from '@angular/core';
import { Notification } from '../../models/Notification';
import { NotificationType } from '../../enums/NotificationType';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  currentUserId = '87e48e98-e923-49be-a134-caff0c7fae0a';

  rentRequests: Notification[];
  opinions: Notification[];

  constructor(
    private notificationService: NotificationService // nie lepiej zawrzeć to w UserService?
  ) { }

  ngOnInit() {
    let allUserNotifications: Notification[];
    this.notificationService.getUserNotifications(this.currentUserId)
      .subscribe(n => allUserNotifications = n);
    this.rentRequests = allUserNotifications.filter(n => n.type === NotificationType.rentRequest);
    this.opinions = allUserNotifications.filter(n => n.type === NotificationType.opinion);
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
