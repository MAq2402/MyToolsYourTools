import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { RegisterCredentials } from '../models/registerCredentials';
import { Observable, Subscription } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  baseUrl = 'https://localhost:44341/api/';
  constructor(private http: HttpClient) {}

  register(credentials: RegisterCredentials): Subscription {
    return this.http.post<any>(this.baseUrl + 'register', credentials, httpOptions).subscribe(u => {
      this.currentUser = u;
      localStorage.setItem('auth_key', u.id);
    });
  }
}
