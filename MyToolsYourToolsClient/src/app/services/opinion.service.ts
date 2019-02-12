import { Injectable } from '@angular/core';
import { Opinion } from '../models/Opinion';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  baseUrl = 'https://localhost:44341/api/';

  constructor(private http: HttpClient) { }

  getOpinions(): Observable<Opinion[]> {
    return this.http.get<Opinion[]>(this.baseUrl + 'opinions');
  }

  addOpinion(opinion: Opinion): Observable<Opinion> {
    return this.http.post<Opinion>(this.baseUrl + opinion.ratedUserId + '/' + opinion.ratingUserId + '/opinions',
            opinion, httpOptions);
  }

}
