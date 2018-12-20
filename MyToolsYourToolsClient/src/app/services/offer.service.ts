import { Injectable } from '@angular/core';
import { Offer } from '../models/offer';
import { OFFERS } from '../offers-list/mockToolsTable';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OfferService {

  constructor() { }

  getOffers(): Observable<Offer[]> {
    return of(OFFERS);
  }
  addOffer(offer: Offer): Observable<Offer> {
    OFFERS.push(offer);
    return of();
  }

}
