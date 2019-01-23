import { Injectable } from '@angular/core';
import { Notification } from '../models/Notification';
import { NotificationType } from '../enums/NotificationType';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: Notification[] = [
    {id: '1', ownerId: '1', targetNotificationUserId: '2', targetNotificationUserName: 'Staszek',
     offerId: '1000', offerName: 'Kosiarka ogrodowa - NOWA', type: NotificationType.rentRequest},
    {id: '2', ownerId: '1', targetNotificationUserId: '3', targetNotificationUserName: 'Leszek',
     offerId: '1024', offerName: 'Łopatka', type: NotificationType.rentRequest},
    {id: '3', ownerId: '1', targetNotificationUserId: '2', targetNotificationUserName: 'Staszek',
     offerId: '1003', offerName: 'Stare grabie', type: NotificationType.opinion}
  ];
    constructor() { }

  getUserNotifications(userId: string): Observable<Notification[]> {
    return of(this.notifications);
  }
}
