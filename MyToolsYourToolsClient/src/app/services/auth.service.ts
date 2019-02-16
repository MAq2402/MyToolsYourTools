import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { RegisterCredentials } from '../models/registerCredentials';
import { LoginCredentials } from '../models/loginCredentials';
import { Observable, Subscription, of } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User;
  error: String;
  baseUrl = 'https://localhost:44341/api/';
  constructor(private http: HttpClient, public router: Router) {}

  register(credentials: RegisterCredentials): Subscription {
    return this.http.post<any>(this.baseUrl + 'register', credentials, httpOptions).subscribe(u => {
      this.currentUser = u;
      localStorage.setItem('auth_key', u.id);
      this.router.navigate(['']);
    });
  }
  login(credentials: LoginCredentials): Subscription{
    return this.http.post<any>(this.baseUrl + 'login', credentials, httpOptions).subscribe(u => {
      this.currentUser = u;
      localStorage.setItem('auth_key', u.id);
      this.router.navigate(['']);
    },
    (error: String) => { this.error = error; }
    );
  }

  getCurrentUser(): Observable<User> {
    if(this.currentUser) {
      return of(this.currentUser);
    } else {
      return this.http.get<User>(this.baseUrl + 'users/' + localStorage.getItem('auth_key'));
    }
  }
  setCurrentUserToNull() {
    this.currentUser = null;
  }
}
