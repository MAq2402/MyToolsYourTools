import { Injectable } from '@angular/core';
import { Notification } from '../models/Notification';
import { NotificationType } from '../enums/NotificationType';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationForCreation } from '../models/NotificationForCreation';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = 'https://localhost:44341/api/';
  private notificationUpdateAnnouncedSource = new Subject<boolean>();

  notificationUpdateAnnounced$ = this.notificationUpdateAnnouncedSource.asObservable();

  constructor(private http: HttpClient) { }



  getUserNotifications(userId: string): Observable<Notification[]> {
   return this.http.get<Notification[]>(this.baseUrl + 'notifications/' + userId, httpOptions);
  }
  addNotification(notification: NotificationForCreation) :Observable<NotificationForCreation>{
    return this.http.post<NotificationForCreation>(this.baseUrl+'notifications/',notification,httpOptions);
  }
  deleteNotification(notificationId: string): Observable<{}> {
    return this.http.delete(this.baseUrl+'notifications/'+notificationId,httpOptions);
  }
  checkIfUserCanSendRentRequest(userId: string, offerId: string): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + 'notifications/' + userId +
      '/' +  offerId + '/check-if-can-send-rent-request', httpOptions);
   }
   announceNotificationUpdate(message: boolean) {
    this.notificationUpdateAnnouncedSource.next(message);
    console.log("update");
  }

}
