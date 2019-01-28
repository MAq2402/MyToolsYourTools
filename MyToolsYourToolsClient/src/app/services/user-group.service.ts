import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserGroup } from '../models/UserGroup';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserGroupService {
  baseUrl = 'https://localhost:44341/api/';

  constructor(private http: HttpClient) { }

  joinGroup (userGroup: UserGroup): Observable<UserGroup> {
    return this.http.post<UserGroup>(this.baseUrl + 'user-groups', userGroup, httpOptions);
  }

  leaveGroup (userGroup: UserGroup): Observable<UserGroup> {
    return this.http.request<UserGroup>('delete', this.baseUrl + 'user-groups',
     {body: userGroup, headers: httpOptions.headers});
  }
}
