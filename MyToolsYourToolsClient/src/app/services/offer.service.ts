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
    {id: '1', name: 'Łopata', groupId: 'c787d0d4-6eba-49fb-9a5f-07278b2319f0', category: Category.manual_tools,
     description: 'to urządzenie kopie dziury xd', ownerId: 'f290baf8-bca5-4b21-94c2-4af3be12ddf3', status: OfferStatus.active,
     imgSrc: 'https://cdn4.iconfinder.com/data/icons/basic-dashboard-1/512/Basic_Dashboard_UI_fix_option_machine_tools-512.png'},
    {id: '2', name: 'Kosiarka', groupId: '2', category: Category.mowers,
    description: 'to urządzenie kosi', ownerId: '1', status: OfferStatus.active,
    imgSrc: 'https://cdn2.iconfinder.com/data/icons/ballicons-2-free/100/wrench-512.png'},
    {id: '3', name: 'Piła mechaniczna', groupId: '1', category: Category.manual_tools,
    description: 'to urządzenie piłuje', ownerId: '2', status: OfferStatus.active,
    imgSrc: 'https://cdn4.iconfinder.com/data/icons/basic-dashboard-1/512/Basic_Dashboard_UI_fix_option_machine_tools-512.png'},
    {id: '4', name: 'Kosiarka 2', groupId: 'c787d0d4-6eba-49fb-9a5f-07278b2319f0', category: Category.mowers,
    description: 'to urządzenie kosi', ownerId: 'f290baf8-bca5-4b21-94c2-4af3be12ddf3', status: OfferStatus.borrowed,
    imgSrc: 'https://cdn2.iconfinder.com/data/icons/ballicons-2-free/100/wrench-512.png'}
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
    offer.id = '4';
    if (offer.imgSrc === '') {
      offer.imgSrc = 'https://cdn2.iconfinder.com/data/icons/ballicons-2-free/100/wrench-512.png';
    }
    offer.ownerId = '2';
    offer.status = OfferStatus.active;
    this.offers.push(offer);
    // TODO: zapis do bazy
  }

  getOffers(): Observable<Offer[]> {
    return of(this.offers);
  }

  getUserOffers(userId: string) {
    return of(this.offers.filter(o => o.ownerId === userId));
  }

  getOffer(offerId: string) {
    return of(this.offers.find(o => o.id === offerId));
  }

  // TODO: na backendzie funckja zmieniająca status oferty badź dwie ukrywająca i aktywująca
  hideOffer(offerId: string) {
    return of(this.offers.find(o => o.id === offerId).status = OfferStatus.hidden);
  }

  activeOffer(offerId: string) {
    return of(this.offers.find(o => o.id === offerId).status = OfferStatus.active);
  }

}
