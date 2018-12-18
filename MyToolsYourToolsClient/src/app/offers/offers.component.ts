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

  constructor(private offerService: OfferService) {

  }
offers: Offer[];
  ngOnInit() {
    this.offerService.getOffers().subscribe(o => this.offers = o);
  }

  onSearched(searchQuery: string) {
    this.searchedOffers.filter(o => o.name.includes(searchQuery));
  }

}
