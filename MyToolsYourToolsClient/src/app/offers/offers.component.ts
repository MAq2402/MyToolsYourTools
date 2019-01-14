import { Component, OnInit } from '@angular/core';
import { OfferService } from '../services/offer.service';
import { Offer } from '../models/offer';
import { Group } from '../models/Group';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  activeOffers: Offer[];
  searchedOffers: Offer[];
  offers: Offer[];
  groups: Group[];

  constructor(private offerService: OfferService, private groupService: GroupService) {
  }

  ngOnInit() {
    this.offerService.getOffers().subscribe(o => this.offers = o);
    this.offerService.getActiveOffers().subscribe(o => this.activeOffers = o);
    this.groupService.getGroups().subscribe(o => this.groups = o);
    this.searchedOffers = this.activeOffers;
  }
  onSearched(searchQuery: string) {
    if (searchQuery) {
      this.searchedOffers = this.activeOffers.filter(o => o.name.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
      this.searchedOffers = this.activeOffers;
    }
  }

  private searchGroupName(groupId) {
    for (const g of this.groups) {
      if (g.id === groupId) {
        return g.name;
      }
    }
    }

}
