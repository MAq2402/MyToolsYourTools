import { Component, OnInit } from '@angular/core';
import { Group } from '../models/Group';
import { GroupService } from '../services/group.service';
import { OfferService } from '../services/offer.service';
import { Offer } from '../models/Offer';
import { ToolCategory } from '../enums/tool-category';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { toolCategoryHelper } from './tool-category-helper';


@Component({
  selector: 'app-offer-creator',
  templateUrl: './offer-creator.component.html',
  styleUrls: ['./offer-creator.component.css']
})
export class OfferCreatorComponent implements OnInit {

  model: Offer = {
    id: '',
    tool: '',
    ownerId: '',
    imageSource: '',
    description: '',
    status: null,
    toolCategory: null,
    groupId: null,
    toolCategoryEnumerationNumber: 0,
  };
  groups: Group[];
  categoryName: string = 'Kosiarka';

  currentUserId: string;

  constructor(private groupService: GroupService,
    private offerService: OfferService,
    private alertService: AlertService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('auth_key');
    this.groupService.getUserGroups(this.currentUserId).subscribe(o => {
      this.groups = o;
      if(this.groups[0]) {
        this.model.groupId = this.groups[0].id;
      }
    });
  }

  addOffer() {
    this.resolveCategory();
    this.offerService.addOffer(this.model, this.currentUserId).subscribe(res => {
      this.alertService.success('Oferta utworzona pomyślnie');
      this.userService.announceUserUpdate(true);
      this.router.navigate(['offer-view/' + res.id]);
    }, error => {
      this.alertService.error(error.error);
    });
  }

  resolveCategory() {
    for (const category in toolCategoryHelper) {
      if (toolCategoryHelper[category].category === this.categoryName) {
        this.model.toolCategoryEnumerationNumber = toolCategoryHelper[category].id;
        this.model.imageSource = toolCategoryHelper[category].src;
      }
    }
  }
  getCategoriesNames() {
    return Object.values(ToolCategory);
  }

}

