import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Rent } from '../models/Rent';
import { AlertService } from './alert.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})
export class RentService {
  baseUrl = 'https://localhost:44341/api/';

  constructor(private http: HttpClient, private alertService: AlertService) { }

  addRent (rent: Rent): Observable<Rent> {
    return this.http.post<Rent>(this.baseUrl + 'rents', rent, httpOptions)
  }

  deleteRent (offerId: string): Observable<Rent> {
    return this.http.delete<Rent>(this.baseUrl + 'rents/' + offerId, httpOptions);
  }

}
