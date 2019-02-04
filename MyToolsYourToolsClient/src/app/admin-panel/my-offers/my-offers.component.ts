import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { GroupService } from '../../services/group.service';
import { Offer } from '../../models/offer';
import { Group } from '../../models/group';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  userOffers: Offer[];
  groups: Group[];
  currentUserId: string;
  constructor(
    private offerService: OfferService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('auth_key');
    // this.offerService.getOffers().subscribe(o => (this.userOffers = o)); // ZMIENIĆ NA getUserOffers()
    this.groupService.getUserGroups(this.currentUserId)
      .subscribe(o => (this.groups = o));
    this.groupService.getGroups().pipe(
        map(g => this.groups = g),
        tap(_ => this.offerService.getOffers().subscribe(o => (this.userOffers = o)))
      ).subscribe();

  }

}
