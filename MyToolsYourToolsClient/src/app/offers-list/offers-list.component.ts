import { Component, OnInit } from '@angular/core';

import {OFFERS} from './mockToolsTable';
import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';


@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {
   offers: Offer[] = [];

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.offerService.getOffers().subscribe(o => this.offers = o);
  }

}
