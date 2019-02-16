import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { RegisterCredentials } from '../models/registerCredentials';
import { LoginCredentials } from '../models/loginCredentials';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  error: String;
  registerError: any;
  baseUrl = 'https://localhost:44341/api/';
  constructor(private http: HttpClient, public router: Router, private alertService: AlertService) {}

  register(credentials: RegisterCredentials): Subscription {
    return this.http.post<any>(this.baseUrl + 'register', credentials, httpOptions).subscribe(u => {
      this.alertService.success("Rejestracja przebiegła pomyślnie (z serwisu)");
      this.currentUser = u;
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
      this.router.navigate(['']);
    },
    error=>this.alertService.error(error.error));

  }
}
