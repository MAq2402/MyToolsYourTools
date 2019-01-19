import { Component, OnInit } from '@angular/core';
import { RegisterCredentials } from '../models/registerCredentials';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: RegisterCredentials = {
    userName: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',
  };
  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.model);
  }
}
