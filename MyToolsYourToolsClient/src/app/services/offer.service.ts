import { Injectable } from '@angular/core';
import { Category } from '../enums/Category';
import { OfferStatus } from '../enums/OfferStatus';
import { Offer } from '../models/Offer';

@Injectable()
export class OfferService {

  offers: Offer[] = [
    {id: 1, name: 'Łopata', groupId: 1, category: Category.manual_tools,
     description: 'to urządzenie kopie dziury xd', ownerId: 1, status: OfferStatus.active,
     imgSrc: 'https://cdn4.iconfinder.com/data/icons/basic-dashboard-1/512/Basic_Dashboard_UI_fix_option_machine_tools-512.png'},
    {id: 2, name: 'Kosiarka', groupId: 2, category: Category.mowers,
    description: 'to urządzenie kosi', ownerId: 1, status: OfferStatus.borrowed,
    imgSrc: 'https://cdn2.iconfinder.com/data/icons/ballicons-2-free/100/wrench-512.png'},
    {id: 3, name: 'Piła mechaniczna', groupId: 1, category: Category.manual_tools,
    description: 'to urządzenie piłuje', ownerId: 2, status: OfferStatus.active,
    imgSrc: 'https://cdn4.iconfinder.com/data/icons/basic-dashboard-1/512/Basic_Dashboard_UI_fix_option_machine_tools-512.png'}
  ];

  constructor() { }

  getOffers() {
    return this.offers;
  }

  getActiveOffers() {
    const activeOffers: Offer [] = [];
    for (const offer of this.offers) {
      if (offer.status === OfferStatus.active) {
        activeOffers.push(offer);
    }
    }
    return activeOffers;
  }

  addOffer(offer: Offer) {
    this.offers.push(offer);
  }

}
