import { Component, OnInit } from '@angular/core';
import { Category } from '../enums/Category';
import { Group } from '../models/Group';
import { GroupService } from '../services/group.service';
import { FormControl } from '@angular/forms';
import { OfferService } from '../services/offer.service';
import { Router } from '@angular/router';
import { OfferStatus } from '../enums/OfferStatus';
import { RegisterCredentials } from '../models/registerCredentials';
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
category: Category.carriages;
groups: Group[];
group: Group;
currentUserId: string;

offer: Offer = {
  id: '',
  status: OfferStatus.active,
  ownerId: '',
  imgSrc: '',
  category: null,
  description: '',
  groupId: '',
  name: ''
};

  constructor(private groupService: GroupService, private offerService: OfferService, private router: Router) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('auth_key');
    this.groupService.getUserGroups(this.currentUserId).subscribe(o => this.groups = o);
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
    this.assignValuesToOffer();
    this.offerService.addOffer(this.offer, this.currentUserId).subscribe(offerFromResponse => {
      this.router.navigate(['offer-view/' + offerFromResponse.ownerId]);
    });
    this.name.reset();
    this.description.reset();
    this.imageSrc.reset();
  }
  private assignValuesToOffer() {
    this.offer.name = this.name.value;
    this.offer.imgSrc = this.imageSrc.value;
    this.offer.status = OfferStatus.active;
    this.offer.ownerId = this.currentUserId;
    this.offer.category = this.category;
    this.offer.description = this.description.value;
    this.offer.groupId = this.group.id;
  }
}

