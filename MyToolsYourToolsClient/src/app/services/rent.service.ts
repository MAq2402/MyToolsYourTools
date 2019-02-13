import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rent } from '../models/Rent';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})
export class RentService {
  baseUrl = 'https://localhost:44341/api/';

  constructor(private http: HttpClient) { }

  addRent (rent: Rent): Observable<Rent> {
    return this.http.post<Rent>(this.baseUrl + 'rents', rent, httpOptions);
  }

  deleteRent (offerId: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'rents/' + offerId, httpOptions);
  }


}
