import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/Offer';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../services/offer.service';
import { Group } from '../models/Group';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';
import { map, tap } from 'rxjs/operators';
import { OfferStatus } from '../enums/OfferStatus';
import { AlertService } from '../services/alert.service';

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

  constructor(private route: ActivatedRoute,
    private offerService: OfferService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
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

    return Object.values(OfferStatus)[this.offer.status] === OfferStatus.rented;
  }

  private hasMyOfferHiddenStatus() {
    return Object.values(OfferStatus)[this.offer.status] === OfferStatus.hidden;
  }

  private changeOfferStatus() {
    if (Object.values(OfferStatus)[this.offer.status] === OfferStatus.hidden) {
      this.offerService.activateOffer(this.offer.id).subscribe(res => this.offer = res);
    } else {
      this.offerService.hideOffer(this.offer.id).subscribe(res => this.offer = res);
    }
  }

  getOfferStatusName(number: number) {
    return Object.values(OfferStatus)[number];
  }

  sendRentRequest(event, userId, offerId) {
    // TODO: wysłanie żądania wyporzyczenia
  }

  sendConfirmReturn(event, userId, offerId) {
    // TODO: wysłanie potwierdzenia zwrotu
  }

  deleteOffer() {
    this.offerService.deleteOffer(this.offer.id).subscribe(res => {
      this.router.navigate(['admin-panel']);
      this.alertService.success('Pomyślnie usunięto ofertę');
    },
    err => {
      this.alertService.error(err.error);
    });
  }

}
