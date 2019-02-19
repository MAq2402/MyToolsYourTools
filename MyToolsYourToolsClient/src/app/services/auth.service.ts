import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { RegisterCredentials } from '../models/registerCredentials';
import { LoginCredentials } from '../models/loginCredentials';
import { Observable, Subscription, of } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { UserService } from './user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User;
  error: String;
  registerError: any;
  baseUrl = 'https://localhost:44341/api/';
  constructor(private http: HttpClient, public router: Router, private alertService: AlertService, private userService: UserService) {}

  register(credentials: RegisterCredentials): Subscription {
    return this.http.post<any>(this.baseUrl + 'register', credentials, httpOptions).subscribe(u => {
      this.alertService.success("Rejestracja przebiegła pomyślnie (z serwisu)");
      this.currentUser = u;
      this.userService.announceUserUpdate(true);
      localStorage.setItem('auth_key', u.id);
      this.router.navigate(['']);
    },
    error=>this.alertService.error(error.error));
  }
  login(credentials: LoginCredentials): Subscription{
    return this.http.post<any>(this.baseUrl + 'login', credentials, httpOptions).subscribe(u => {
      this.currentUser = u;
      this.alertService.success("Witaj "+this.currentUser.userName+"!");
      localStorage.setItem('auth_key', u.id);
      this.userService.announceUserUpdate(true);
      this.router.navigate(['']);
    },

    error=>this.alertService.error(error.error));
  }

  getCurrentUser(): Observable<User> {
      console.log('wchodzeTutaj)');
      return this.http.get<User>(this.baseUrl + 'users/' + localStorage.getItem('auth_key'));
    }
  setCurrentUserToNull() {
    this.currentUser = null;
  }
}
