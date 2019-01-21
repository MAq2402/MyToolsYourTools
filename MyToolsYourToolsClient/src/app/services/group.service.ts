import { Injectable } from '@angular/core';
import { Group } from '../models/Group';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

groups: Group[] = [
  {id: '1', name: 'Januszery'},
  {id: '2', name: 'Zmitac'}
];

  constructor() { }

  getGroups(): Observable<Group[]> {
    return of(this.groups);
  }

}
