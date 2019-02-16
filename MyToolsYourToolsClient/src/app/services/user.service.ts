import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUpdateAnnouncedSource = new Subject<boolean>();
  baseUrl = 'https://localhost:44341/api/';

  userUpdateAnnounced$ = this.userUpdateAnnouncedSource.asObservable();

  constructor(private http:HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'Users' , httpOptions);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.baseUrl+ 'Users/' + id, httpOptions);
  }

  announceUserUpdate(message: boolean) {
    this.userUpdateAnnouncedSource.next(message);
  }
}
