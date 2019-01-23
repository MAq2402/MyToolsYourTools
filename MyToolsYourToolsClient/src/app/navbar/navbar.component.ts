import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.authService.currentUser = null;
    localStorage.removeItem('auth_key');
    this.router.navigate(['login']);
  }


  goToOfferCreator() {
    this.router.navigate(['offer-creator']);
  }

}
