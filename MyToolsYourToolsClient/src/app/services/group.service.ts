import { Injectable } from '@angular/core';
import { Group } from '../models/Group';

@Injectable()
export class GroupService {

groups: Group[] = [
  {id: 1, name: 'Januszery'},
  {id: 2, name: 'Zmitac'}
];

  constructor() { }

  getGroups() {
    return this.groups;
  }

}
