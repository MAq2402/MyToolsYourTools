import { Injectable } from '@angular/core';
import { Notification } from '../models/Notification';
import { NotificationType } from '../enums/NotificationType';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = 'https://localhost:5001/api/notifications/';

  notifications: Notification[] = [
    {id: '1', ownerId: '1', targetNotificationUserId: '2', targetNotificationUserName: 'Staszek',
     offerId: '1000', offerName: 'Kosiarka ogrodowa - NOWA', type: NotificationType.rentRequest},
    {id: '2', ownerId: '1', targetNotificationUserId: '3', targetNotificationUserName: 'Leszek',
     offerId: '1024', offerName: 'Łopatka', type: NotificationType.rentRequest},
    {id: '3', ownerId: '1', targetNotificationUserId: '2', targetNotificationUserName: 'Staszek',
     offerId: '1003', offerName: 'Stare grabie', type: NotificationType.opinion}
  ];
    constructor(private http: HttpClient) { }

  getUserNotifications(userId: string): Observable<Notification[]> {
   // return this.http.get<Notification[]>(this.baseUrl+userId);
   return of(this.notifications);
  }
  addNotification(notification: Notification){
    return this.http.post<Notification>(this.baseUrl+'add',notification,httpOptions);
  }
  deleteNotification(notificationId: string){
    //this.http.delete(this.baseUrl+notificationId);
  }
}
