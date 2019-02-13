import { Component, OnInit } from '@angular/core';
import { Notification } from '../../models/Notification';
import { NotificationType } from '../../enums/NotificationType';
import { NotificationService } from '../../services/notification.service';
import { Opinion } from '../../models/Opinion';
import { OpinionService } from '../../services/opinion.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css', '../admin-panel.component.css']
})
export class NotificationsComponent implements OnInit {

 
  inputText = {};



  currentUserId: string;

  rentRequests: Notification[];
  opinions: Notification[];

  constructor(
    private notificationService: NotificationService,
    private opinionService:  OpinionService

  ) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('auth_key');
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
    console.log(this.inputText[requestId]);
    let currentRequest: Notification = this.opinions.find(r=>r.id===requestId);
    let tmpOpinion: Opinion = {
      id: null,
      message: this.inputText[requestId],
      ratedUserId: currentRequest.targetUserId,
      ratingUserId: currentRequest.ownerId
  } 
  
  
    this.opinionService.addOpinion(tmpOpinion).subscribe();
    this.opinions = this.opinions.filter(n => n.id !== requestId);
    this.notificationService.deleteNotification(requestId).subscribe();
  }

}
