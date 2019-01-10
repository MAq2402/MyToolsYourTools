import { Component, OnInit, Input } from '@angular/core';
import { Offer } from '../models/offer';
import { OfferService } from '../services/offer.service';
import { Group } from '../models/Group';


@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {
  @Input() offers: Offer[];
  @Input() groups: Group[];

  constructor() { }

  ngOnInit() {

  }

  private searchGroupName(groupId) {
    for (const g of this.groups) {
      if (g.id === groupId) {
        return g.name;
      }
    }
    }

}
