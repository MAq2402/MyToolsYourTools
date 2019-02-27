import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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

  constructor(
    private route: ActivatedRoute,
     private userService: UserService,
     private location: Location
     ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
    const userId = params.get('userId');
    this.userService.getUserById(userId).subscribe(u => this.user = u);
   
    });
  }

  goBack() {
    this.location.back();
  }
}
