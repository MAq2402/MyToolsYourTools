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
    let allOpinions: Opinion[];
    this.opinionService.getOpinions()
      .pipe(
        tap(allOpinions => this.opinions = allOpinions.filter( o => o.ratedUserId === this.user.id))
      )
      .subscribe();
  }

  private searchRatingUserName(ratingUserId: string) {

    return  this.users.find(u => u.id === ratingUserId).firstName;
  }

  private searchRatingUserSurname(ratingUserId: string) {

    return  this.users.find(u => u.id === ratingUserId).lastName;
  }
}
