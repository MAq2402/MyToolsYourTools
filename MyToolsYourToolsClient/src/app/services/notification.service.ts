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
  baseUrl = 'https://localhost:44341/api/';


    constructor(private http: HttpClient) { }

  getUserNotifications(userId: string): Observable<Notification[]> {
   return this.http.get<Notification[]>(this.baseUrl + 'notifications/' + userId, httpOptions);
  }
  addNotification(notification: Notification) :Observable<Notification>{
    return this.http.post<Notification>(this.baseUrl+'notifications/',notification,httpOptions);
  }
  deleteNotification(notificationId: string): Observable<{}> {
    console.log(this.baseUrl+'notifications/'+notificationId);
    return this.http.delete(this.baseUrl+'notifications/'+notificationId,httpOptions);
  }
}
