import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Tools Your Tools';

  showNavbar(): boolean {
    return !!localStorage.getItem('auth_key');
  }
}
