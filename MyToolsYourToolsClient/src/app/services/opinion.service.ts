import { Injectable } from '@angular/core';
import { Opinion } from '../models/Opinion';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  opinions: Opinion[] = [
    {id: '1', message: 'Transakcja przebiegła pomyślnie', ratedUserId: '1', ratingUserId: '2'},
    {id: '2', message: 'Nie polecam współpracy z tym użytkownikiem', ratedUserId: '2', ratingUserId: '1'},
    {id: '3', message: 'Polecam ', ratedUserId: '1', ratingUserId: '2'},
    {id: '4', message: 'Super ', ratedUserId: '1', ratingUserId: '2'},
    {id: '5', message: 'Janusz pełną parą ', ratedUserId: '1', ratingUserId: '2'},
    {id: '6', message: 'Janusz pełną parą ', ratedUserId: '1', ratingUserId: '2'},
    {id: '7', message: 'Janusz pełną parą ', ratedUserId: '1', ratingUserId: '2'},
    {id: '8', message: 'Janusz pełną parą ', ratedUserId: '1', ratingUserId: '2'}
  ];

  constructor() { }

  getOpinions(): Observable<Opinion[]> {
    return of(this.opinions);
  }

  addOpinion(opinion: Opinion) {
    this.opinions.push(opinion);
  }

}
