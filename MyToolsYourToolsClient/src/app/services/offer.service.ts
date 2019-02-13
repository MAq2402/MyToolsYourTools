import { Injectable } from '@angular/core';
import { Offer } from '../models/Offer';
import { Observable, of} from 'rxjs';
import { OfferStatus } from '../enums/OfferStatus';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private baseUrl = 'https://localhost:44341/api/';
  constructor(private http: HttpClient) { }

  getActiveOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.baseUrl + 'offers?onlyActive=true');
  }

  addOffer(offer: Offer, userId: string): Observable<Offer> {
    return this.http.post<Offer>(this.baseUrl + userId + '/offers', offer, httpOptions);
  }

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.baseUrl + 'offers');
  }

  getUserOffers(userId: string):  Observable<Offer[]> {
    return this.http.get<Offer[]>(this.baseUrl + userId + '/offers');
  }

  getOffer(offerId: string): Observable<Offer> {
    return this.http.get<Offer>(this.baseUrl + 'offers/' + offerId);
  }

  hideOffer(offerId: string): Observable<Offer> {
    return this.http.put<Offer>(this.baseUrl + 'offers/' + offerId + '/hide', {}, httpOptions);
  }

  activeOffer(offerId: string): Observable<Offer>  {
    return this.http.put<Offer>(this.baseUrl + 'offers/' + offerId + '/activate', {}, httpOptions);
  }

}
