import { Component, OnInit } from '@angular/core';
import { OfferService } from '../services/offer.service';
import { Offer } from '../models/offer';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  searchedOffers: Offer[];
  offers: Offer[];

  constructor(private offerService: OfferService) {
  }

  ngOnInit() {
    this.offerService.getOffers().subscribe(o => this.offers = o);
    this.searchedOffers = this.offers;
  }
  onSearched(searchQuery: string) {
    if (searchQuery) {
      this.searchedOffers = this.offers.filter(o => o.name.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
      this.searchedOffers = this.offers;
    }
  }

}
