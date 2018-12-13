import { Component, OnInit } from '@angular/core';

import {TOOLS} from './mockToolsTable'


@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {
   tools = TOOLS;

  constructor() { }

  ngOnInit() {
  }

}
