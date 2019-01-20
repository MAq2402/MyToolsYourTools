import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

users: User[] = [
  {id: '1', userName: 'jankow', firstName: 'Janusz', lastName: 'Kowalski', phoneNumber: '1',  email: 'janusz@gmail.com', points: 0},
  {id: '2', userName: 'slodkaUlcia123', firstName: 'Ula', lastName: 'WiadomoJaka',
  phoneNumber: '666', email: 'warun@zmitac.xd', points: 100}
];
  constructor() { }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  addUser(user: User) {
    this.users.push(user);
  }

}
