import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable()
export class UserService {

users: User[] = [
  {id: 1, name: 'Janusz', email: 'janusz@gmail.com'},
  {id: 2, name: 'Ula', email: 'warun@zmitac.xd'}
];
  constructor() { }

  getUsers() {
    return this.users;
  }

  addUser(user: User) {
    this.users.push(user);
  }

}
