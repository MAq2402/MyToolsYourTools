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

  currentUserId: string = '40b06630-03ed-4c15-9640-9f22527b6302';

  rentRequests: Notification[];
  opinions: Notification[];

  constructor(
    private notificationService: NotificationService // nie lepiej zawrzeć to w UserService?
  ) { }

  ngOnInit() {
    //this.currentUserId = localStorage.getItem('auth_key');
    this.notificationService.getUserNotifications(this.currentUserId)
      .subscribe(n => {
        this.rentRequests = n.filter(not => not.type === NotificationType.rentRequest);
        this.opinions = n.filter(not => not.type === NotificationType.opinion);
      });    
  }
  onRequestNotificationApproved(requestId: any){
    
    this.rentRequests = this.rentRequests.filter(n => n.id !== requestId);
    this.notificationService.deleteNotification(requestId).subscribe();

  }
  onRequestNotificationRejected(requestId: any){
    
    this.rentRequests = this.rentRequests.filter(n => n.id !== requestId);
    this.notificationService.deleteNotification(requestId).subscribe();

  }
  onOpinionSent(requestId: any){
    
    this.opinions = this.opinions.filter(n => n.id !== requestId);
    this.notificationService.deleteNotification(requestId).subscribe();

  }

}
