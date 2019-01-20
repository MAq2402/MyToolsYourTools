import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  offerId: number;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
  
    this.route.paramMap.subscribe(params => {
    this.offerId = +params.get('id');
    const userId = +params.get('userId');
    this.userService.getUserById(userId).subscribe(u => this.user = u);
    });
  }
}
