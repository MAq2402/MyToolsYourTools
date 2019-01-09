import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/Offer';
import { OfferService } from '../services/offer.service';
import { Group } from '../models/Group';
import { GroupService } from '../services/group.service';
import { OfferStatus } from '../enums/OfferStatus';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})

export class OffersListComponent implements OnInit {
   offers: Offer[];
   groups: Group[];

  constructor(private _offerService: OfferService, private _groupService: GroupService) { }

  ngOnInit() {
    this.offers = this._offerService.getActiveOffers();
    this.groups = this._groupService.getGroups();
  }

  private searchGroupName(groupId) {
  for (const g of this.groups) {
    if (g.id === groupId) {
      return g.name;
    }
  }
  }

}
