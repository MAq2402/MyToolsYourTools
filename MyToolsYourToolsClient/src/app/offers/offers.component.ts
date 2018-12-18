import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/offer';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  searchedOffers: Offer[];
  constructor() { }

  ngOnInit() {
  }

  onSearched(searchQuery: string) {
    this.searchedOffers.filter(o => o.name.includes(searchQuery));
  }

}
