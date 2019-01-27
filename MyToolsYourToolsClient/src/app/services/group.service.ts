import { Injectable } from '@angular/core';
import { Group } from '../models/Group';
import { Observable, of } from 'rxjs';
import { UserGroup } from '../models/UserGroup';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  baseUrl = 'https://localhost:44341/api/';

groups: Group[] = [
  {id: '1', name: 'Januszery'},
  {id: '2', name: 'Zmitac'}
];

userGroups: UserGroup[] = [
  {userId: '1', groupId: '1'}
];

  constructor(private http: HttpClient) {}

  /** GET groups from the server */
  getGroups (): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl + 'groups');
  }

  getUserGroups(currentUserId: string): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl + currentUserId + '/groups');
  }

  /** POST: add a new group to the server */
  /*addGroup (group: Group): Observable<Group> {
    this.groups.push(group);
    return of(group);
  }*/

  /** POST: add a new group to the server */
  // TODO: trzeba zmienić group na GroupForCreation
  addGroup (group: {name: string}): Observable<Group> {
    return this.http.post<Group>(this.baseUrl + 'groups', group, httpOptions);
  }
}
