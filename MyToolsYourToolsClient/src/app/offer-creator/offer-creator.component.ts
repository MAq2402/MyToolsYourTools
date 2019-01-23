import { Component, OnInit } from '@angular/core';
import { Category } from '../enums/Category';
import { Group } from '../models/Group';
import { GroupService } from '../services/group.service';
import { FormControl } from '@angular/forms';
import { OfferService } from '../services/offer.service';
import { Offer } from '../models/Offer';

@Component({
  selector: 'app-offer-creator',
  templateUrl: './offer-creator.component.html',
  styleUrls: ['./offer-creator.component.css']
})
export class OfferCreatorComponent implements OnInit {
name = new FormControl('');
description = new FormControl('');
imageSrc = new FormControl('');
category: Category = Category.carriages;
groups: Group[];
group: Group;

  constructor(private groupService: GroupService, private offerService: OfferService) { }

  ngOnInit() {
    this.groupService.getGroups().subscribe(o => this.groups = o);
    this.group = this.groups[0];
  }

  categoryToString() {
    const values: [string, any][] = Object.entries(Category);
    const names: [string, any][] = [];
    for (const value of values) {
      names.push(value[1]);
    }
    return names;
  }

  canClickButton() {
    if (this.name.value === '') {
      return false;
    }
    return true;
  }

  addOffer() {
    this.offerService.addOffer(new Offer(this.name.value, this.category, this.description.value, this.imageSrc.value, this.group.id));
    this.name.reset();
    this.description.reset();
    this.imageSrc.reset();
  }
}
