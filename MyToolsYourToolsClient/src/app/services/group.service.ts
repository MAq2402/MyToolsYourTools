import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/Group';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  baseUrl = 'https://localhost:44341/api/';

  constructor(private http: HttpClient) {}

  getGroups (): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl + 'groups');
  }

  getGroupById (groupId: string): Observable<Group> {
    return this.http.get<Group>(this.baseUrl + 'groups/' + groupId);
  }

  getUserGroups(currentUserId: string): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl + currentUserId + '/groups');
  }

  addGroup (group: Group): Observable<Group> {
    return this.http.post<Group>(this.baseUrl + 'groups', group, httpOptions);
  }
}
