import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { AlertService } from '../services/alert.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private groupService: GroupService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }
  logout() {
    this.authService.currentUser = null;
    localStorage.removeItem('auth_key');
    this.router.navigate(['login']);
    this.alertService.success("Wylogowano");
  }

  goToOfferCreator() {
    // check if user has already groups
    const currentUserId = localStorage.getItem('auth_key');
    this.groupService.getUserGroups(currentUserId).pipe(
      tap(g => {
        if (g.length > 0) {
          this.router.navigate(['offer-creator']);
        } else {
          this.alertService.warining('Aby utworzyć ofertę, musisz być w conajmniej 1 grupie. ' +
            'Dołącz do dowolnej grupy w panelu administratora.');
        }
      })
    ).subscribe();
  }

}
