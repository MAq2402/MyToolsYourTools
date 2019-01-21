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

  constructor(private route: ActivatedRoute, private offerService: OfferService, private userService: UserService,
     private groupService: GroupService) { }

  ngOnInit() {
    this.offerService.getOffers().subscribe(o => this.offers = o);
    this.groupService.getGroups().subscribe(o => this.groups = o);
    this.userService.getUsers().subscribe(o => this.users = o);
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
        return user.firstName + ' ' +  user.lastName;
      }
    }
  }

  private getUserSurname(userId) {
    for (const user of this.users) {
      if (user.id === userId) {
        return user.surname;
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
