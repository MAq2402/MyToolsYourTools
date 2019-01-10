import { Injectable } from '@angular/core';
import { Offer } from '../models/Offer';
import { Observable, of} from 'rxjs';
import { OfferStatus } from '../enums/OfferStatus';
import { Category } from '../enums/Category';

@Injectable({
  providedIn: 'root',
})
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

  getActiveOffers(): Observable<Offer[]> {
    const activeOffers: Offer [] = [];
    for (const offer of this.offers) {
      if (offer.status === OfferStatus.active) {
        activeOffers.push(offer);
    }
    }
    return of(activeOffers);
  }

  addOffer(offer: Offer) {
    this.offers.push(offer);
  }

  getOffers(): Observable<Offer[]> {
    return of(this.offers);
  }

}
