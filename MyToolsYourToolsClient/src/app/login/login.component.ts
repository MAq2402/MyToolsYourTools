import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginCredentials } from '../models/loginCredentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginCredentials = {
    userName: '',
    password: ''
  }

  constructor(private authService: AuthService) {}
  ngOnInit() {
  }
  

  onSubmit() {
    this.authService.login(this.model);
  }
}
