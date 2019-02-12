import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/User';
import { OpinionService } from '../../services/opinion.service';
import { Opinion } from '../../models/Opinion';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.css']
})
export class OpinionsComponent implements OnInit {

  @Input() user: User;
  opinions: Opinion[];
  users: User[];

  constructor(private opinionService: OpinionService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(u => this.users = u);
    this.opinionService.getUserReceivedOpinions(this.user.id).subscribe(o => this.opinions = o);
  }

  private searchRatingUserName(ratingUserId: string) {

    return  this.users.find(u => u.id === ratingUserId).firstName;
  }

  private searchRatingUserSurname(ratingUserId: string) {

    return  this.users.find(u => u.id === ratingUserId).lastName;
  }
}
