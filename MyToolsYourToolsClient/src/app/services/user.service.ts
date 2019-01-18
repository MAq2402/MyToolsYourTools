import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

users: User[] = [
  {id: 1, name: 'Janusz', email: 'janusz@gmail.com'},
  {id: 2, name: 'Ula', email: 'warun@zmitac.xd'}
];
  constructor() { }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  addUser(user: User) {
    this.users.push(user);
  }

}
