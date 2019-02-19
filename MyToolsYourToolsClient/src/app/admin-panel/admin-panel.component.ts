import { Component, OnInit, ViewChild } from '@angular/core';
import { MyOffersComponent } from './my-offers/my-offers.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  @ViewChild(MyOffersComponent) myOffers: MyOffersComponent;

  constructor() { }

  ngOnInit() {
  }

  onApprovedRentRequest() {
    this.myOffers.initOffers();
  }

}
