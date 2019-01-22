import { Injectable } from '@angular/core';
import { Group } from '../models/Group';
import { Observable, of } from 'rxjs';
import { UserGroup } from '../models/UserGroup';

@Injectable({
  providedIn: 'root',
})
export class GroupService {

groups: Group[] = [
  {id: '1', name: 'Januszery'},
  {id: '2', name: 'Zmitac'}
];

userGroups: UserGroup[] = [
  {userId: 1, groupId: 1}
];

  constructor() { }

  getGroups(): Observable<Group[]> {
    return of(this.groups);
  }

  getUserGroups(currentUserId: number): Observable<Group[]> {
    const indexesOfUserGroups = this.userGroups.filter(ug => ug.userId === currentUserId).map(ug => ug.groupId);
    return of(this.groups.filter(g => indexesOfUserGroups.includes(g.id)));
  }
}
