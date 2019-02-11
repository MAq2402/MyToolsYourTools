import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/Offer';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from '../services/offer.service';
import { Group } from '../models/Group';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';
import { map, tap } from 'rxjs/operators';
import { OfferStatus } from '../enums/OfferStatus';

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.css']
})
export class OfferViewComponent implements OnInit {

  currentUserId: string;

  offers: Offer[];
  offer: Offer;
  users: User[];
  groups: Group[];

  constructor(private route: ActivatedRoute, private offerService: OfferService, private userService: UserService,
     private groupService: GroupService) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('auth_key');
    // TODO: pobieranie nazwy grupy i nazwy użytkownika zrobić w tap'ie niżej callami do API
    this.groupService.getGroups().subscribe(o => this.groups = o);
    this.userService.getUsers().subscribe(o => this.users = o);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getOffer(id);
    });
  }


  private getOffer(id) {
    this.offerService.getOffer(id).pipe(
      map(o => this.offer = o),
      tap(_ => {
      /* tutaj trzeba pobrać nazwę użytkownika i grupy,
       najlepiej przypisane do zmiennych bindowanych w komponencie */
      })
    ).subscribe();
  }

  private getUserName(userId) {
    for (const user of this.users) {
      if (user.id === userId) {
        return user.userName;
      }
    }
  }

  private getUserSurname(userId) {
    for (const user of this.users) {
      if (user.id === userId) {
        return user.firstName + ' ' +  user.lastName;
      }
    }
  }

  private getGroupName(userId) {
    for (const group of this.groups) {
      if (group.id === userId) {
        return group.name;
      }
    }
  }

  private isMyOffer() {
    return this.offer.ownerId === this.currentUserId;
  }

  private hasMyOfferBorrowedStatus() {
    return this.offer.status === OfferStatus.rented;
  }

  private hasMyOfferHiddenStatus() {
    return this.offer.status === OfferStatus.hidden;
  }

  private changeOfferStatus() {
    // TODO: na backendzie funckja zmieniająca status oferty badź dwie ukrywająca i aktywująca
    if (this.offer.status === OfferStatus.hidden) {
      this.offerService.activeOffer(this.offer.id).pipe(
        tap(_ => this.offer.status = OfferStatus.active) // albo pobranie na nowo oferty
      ).subscribe();
    } else {
      this.offerService.hideOffer(this.offer.id).pipe(
      tap(_ => this.offer.status = OfferStatus.hidden)
      ).subscribe();
    }
  }

  sendRentRequest(event, userId, offerId) {
    // TODO: wysłanie żądania wyporzyczenia
  }

  sendConfirmReturn(event, userId, offerId) {
    // TODO: wysłanie potwierdzenia zwrotu
  }

}
