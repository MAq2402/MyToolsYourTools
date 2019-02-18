import { Component, OnInit, Input } from '@angular/core';
import { Offer } from '../models/offer';
import { Group } from '../models/Group';
import { ToolCategory } from '../enums/tool-category';


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

  searchGroupName(groupId) {
    return this.groups.find(g => g.id === groupId).name;
  }

  getToolCategoryName(number: number): string {
    return Object.values(ToolCategory)[number];
  }

}
