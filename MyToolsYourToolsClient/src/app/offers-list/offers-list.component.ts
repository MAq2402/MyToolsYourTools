import { Component, OnInit } from '@angular/core';

import {OFFERS} from './mockToolsTable';


@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {
   offers = OFFERS;

  constructor() { }

  ngOnInit() {
  }

}
