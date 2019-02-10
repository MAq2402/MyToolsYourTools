import { Component, OnInit } from '@angular/core';
import { Notification } from '../../models/Notification';
import { NotificationType } from '../../enums/NotificationType';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css', '../admin-panel.component.css']
})
export class NotificationsComponent implements OnInit {

  currentUserId = '1';

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

}
