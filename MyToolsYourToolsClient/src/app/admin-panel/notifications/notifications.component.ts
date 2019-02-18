import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Notification } from '../../models/Notification';
import { NotificationType } from '../../enums/NotificationType';
import { NotificationService } from '../../services/notification.service';
import { Opinion } from '../../models/Opinion';
import { OpinionService } from '../../services/opinion.service';
import { RentService } from '../../services/rent.service';
import { Rent } from '../../models/Rent';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css', '../admin-panel.component.css']
})
export class NotificationsComponent implements OnInit {

  @Output() approvedRentRequest = new EventEmitter<boolean>();

  inputText = {};

  currentUserId: string;

  rentRequests: Notification[];
  opinions: Notification[];

  constructor(
    private notificationService: NotificationService,
    private opinionService:  OpinionService,
    private rentService: RentService,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('auth_key');
    this.getUserNotifications();
  }

  getUserNotifications() {
    this.notificationService.getUserNotifications(this.currentUserId)
      .subscribe(n => {
        this.rentRequests = n.filter(not => not.type === NotificationType.rentRequest);
        this.opinions = n.filter(not => not.type === NotificationType.opinion);
      });
  }
  onRequestNotificationApproved(rentRequest: Notification){
    const rentToSend = new Rent(rentRequest.offerId, rentRequest.targetUserId);
    this.rentService.addRent(rentToSend).subscribe(
      result => {
        this.alertService.success('Przedmiot oferty został pomyślnie udostępniony');
        this.approvedRentRequest.emit(true);
        this.deleteNotification(rentRequest);
      },
      error => {
        this.alertService.error(error.error);
        console.log(error);
      }
    );

  }
  onRequestNotificationRejected(rentRequest: Notification){
    this.alertService.info('Prośba o udostępnienie została odrzucona');
    this.deleteNotification(rentRequest);
  }

  deleteNotification(notification: Notification) {
    this.notificationService.deleteNotification(notification.id)
      .subscribe(_ => this.getUserNotifications());
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
