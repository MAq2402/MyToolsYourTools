import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

users: User[] = [
  {id: 1, name: 'Janusz', surname: 'Nowak', email: 'janusz@gmail.com', phoneNumber: '123-456-789'},
  {id: 2, name: 'Ula', surname: 'Hamulec',  email: 'warun@zmitac.xd', phoneNumber: '250-250-250'}
];
  constructor() { }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  addUser(user: User) {
    this.users.push(user);
  }

  getUserById(id: number): Observable<User>{
    return of(this.users.find(x => x.id == id));
  }
}
