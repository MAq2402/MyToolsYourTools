import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { GroupService } from '../../services/group.service';
import { Offer } from '../../models/offer';
import { Group } from '../../models/group';
import { map } from 'rxjs/operators';
import { OfferStatus } from '../../enums/OfferStatus';

enum DisplayedOffers {
  active,
  hidden,
  rented,
  borrowed
}

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css', '../admin-panel.component.css']
})
export class MyOffersComponent implements OnInit {

  currentDisplayedOffersFlag: DisplayedOffers;
  get displayedOffers() { return DisplayedOffers; }

  activeOffers: Offer[];
  rentedOffers: Offer[];
  borrowedOffers: Offer[];
  hiddenOffers: Offer[]
  currentDisplayedOffers: Offer[];
  groups: Group[];
  currentUserId: string;
  constructor(
    private offerService: OfferService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('auth_key');
    this.groupService.getGroups().pipe(
        map(g => this.groups = g)
      ).subscribe();
    this.currentDisplayedOffersFlag = DisplayedOffers.active;
    this.initOffers();
  }

  initOffers() {
    this.offerService.getUserOffers(this.currentUserId).pipe(
      map(o => {
        this.activeOffers = o.filter(offer => Object.values(OfferStatus)[offer.status] === OfferStatus.active);
        this.hiddenOffers = o.filter(offer => Object.values(OfferStatus)[offer.status] === OfferStatus.hidden);
        this.rentedOffers = o.filter(offer => Object.values(OfferStatus)[offer.status] === OfferStatus.rented);
      })
    ).subscribe(_ => {
      switch (this.currentDisplayedOffersFlag) {
        case 0: this.onActiveOffers(); break;
        case 1: this.onHiddenOffers(); break;
        case 2: this.onRentedOffers(); break;
        case 3: this.onBorrowedOffers(); break;
      }
    });
    this.offerService.getBorrowedByUserOffers(this.currentUserId).pipe(
      map(o => this.borrowedOffers = o)
    ).subscribe();
  }

  onRentedOffers() {
    this.currentDisplayedOffers = this.rentedOffers;
    this.currentDisplayedOffersFlag = DisplayedOffers.rented;
  }

  onBorrowedOffers() {
    this.currentDisplayedOffers = this.borrowedOffers;
    this.currentDisplayedOffersFlag = DisplayedOffers.borrowed;
  }

  onHiddenOffers() {
    this.currentDisplayedOffers = this.hiddenOffers;
    this.currentDisplayedOffersFlag = DisplayedOffers.hidden;
  }

  onActiveOffers() {
    this.currentDisplayedOffers = this.activeOffers;
    this.currentDisplayedOffersFlag = DisplayedOffers.active;
  }
}
