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
import { NotificationService } from '../services/notification.service';
import { NotificationForCreation } from '../models/NotificationForCreation';
import { NotificationType } from '../enums/NotificationType';
import { RentService } from '../services/rent.service';
import { serializePath } from '@angular/router/src/url_tree';
import { Opinion } from '../models/Opinion';

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
  group: Group;
  borrower: User;
  owner: User;

  agreementCheckbox = false;
  alreadySendRentRequest: boolean;

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private userService: UserService,
    private groupService: GroupService,
    private alertService: AlertService,
    private notificationService: NotificationService,
    private rentService: RentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('auth_key');
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
        this.notificationService.checkIfUserCanSendRentRequest(this.currentUserId, this.offer.id)
          .subscribe(canSendRentRequest => this.alreadySendRentRequest = !canSendRentRequest);
        this.userService.getUserById(this.offer.ownerId).subscribe(o => this.owner = o);
        this.userService.getOfferBorrower(this.offer.id).subscribe(u => this.borrower = u);
        this.groupService.getGroupById(this.offer.groupId).subscribe(g => this.group = g);
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

  private getUserPhoneNumber(userId) {
    for (const user of this.users) {
      if (user.id === userId) {
        return user.phoneNumber;
      }
    }
  }

  private getUserEmail(userId) {
    for (const user of this.users) {
      if (user.id === userId) {
        return user.email;
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
    if (this.offer) {
      return this.offer.ownerId === this.currentUserId;
    }
  }

  private hasMyOfferBorrowedStatus() {
    if (this.offer) {
      return Object.values(OfferStatus)[this.offer.status] === OfferStatus.rented;
    }
  }

  private hasMyOfferHiddenStatus() {
    if (this.offer) {
      return Object.values(OfferStatus)[this.offer.status] === OfferStatus.hidden;
    }
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

  sendRentRequest() {
    const notificationToSend: NotificationForCreation = {
      ownerId: this.offer.ownerId,
      targetUserId: this.currentUserId,
      offerId: this.offer.id,
      type: NotificationType.rentRequest
    };
    this.notificationService.addNotification(notificationToSend).subscribe(
      result => {
        this.alertService.success('Wysłano prośbę o wypożyczenie.');
        this.userService.announceUserUpdate(true);
        this.alreadySendRentRequest = true;
      },
      error => {
        this.alertService.error(error.error);
        console.log(error);
      }
    );
  }

  sendConfirmReturn() {
    this.rentService.deleteRent(this.offer.id).subscribe(
      result => {
        const notificationToSend: NotificationForCreation = {
          ownerId: result.borrowerId,
          targetUserId: this.currentUserId,
          offerId: result.offerId,
          type: NotificationType.opinion
        };
        this.notificationService.addNotification(notificationToSend).subscribe();
        this.alertService.success('Potwierdzono zwrot przedmiotu oferty');
        this.getOffer(result.offerId); // refresh offer view
      },
      error => {
        this.alertService.error(error.error);
        console.log(error);
      }
    );
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


  onOpinionSent(sentOpinion: Opinion){
    if (sentOpinion != null) {
      this.sendConfirmReturn();
    }
  }

}
