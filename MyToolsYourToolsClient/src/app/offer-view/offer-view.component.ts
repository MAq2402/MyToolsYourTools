import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/Offer';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from '../services/offer.service';
import { Group } from '../models/Group';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.css']
})
export class OfferViewComponent implements OnInit {
offers: Offer[];
offer: Offer;
users: User[];
groups: Group[];

  constructor(private route: ActivatedRoute, private _offerService: OfferService, private _userService: UserService,
     private _groupService: GroupService) { }

  ngOnInit() {
    this.offers = this._offerService.getOffers();
    this.groups = this._groupService.getGroups();
    this.users = this._userService.getUsers();
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.getOffer(id);
    });
  }

  private getOffer(id) {
    for (const offer of this.offers) {
      if (offer.id === id) {
        this.offer = offer;
        return;
      }
    }
  }

  private getUserName(userId) {
    for (const user of this.users) {
      if (user.id === userId) {
        return user.name;
      }
    }
  }

  private getGroupName(userId) {
    for (const group of this.groups) {
      if (group.id === userId) {
        return group.name;
      }
    }
  }

  sendRentRequest(event, userId, offerId) {
    // TODO: wysłanie żądania wyporzyczenia
  }

}
