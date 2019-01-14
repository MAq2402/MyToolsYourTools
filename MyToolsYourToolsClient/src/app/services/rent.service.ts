import { Injectable } from '@angular/core';
import { Rent } from '../models/Rent';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  rents: Rent[];

  constructor() { }

  addRent(rent: Rent) {
    this.rents.push(rent);
  }

}
