import { Component, OnInit } from '@angular/core';
import { Group } from '../models/Group';
import { GroupService } from '../services/group.service';
import { OfferService } from '../services/offer.service';
import { Offer } from '../models/Offer';
import { ToolCategory } from '../enums/tool-category';

const toolCategoryHelper = [
  {id: 0, category: ToolCategory.mower},
  {id: 1, category: ToolCategory.barrow},
  {id: 2, category: ToolCategory.gardenAccessory},
  {id: 3, category: ToolCategory.shovel},
  {id: 4, category: ToolCategory.rake}
];
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
    toolCategoryEnumerationNumber: null
  };
  groups: Group[];
  categoryName: string;

  currentUserId: string;

  constructor(private groupService: GroupService, private offerService: OfferService) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('auth_key');
    this.groupService.getUserGroups(this.currentUserId).subscribe(o => this.groups = o);
  }

  addOffer() {
    for (const category in toolCategoryHelper) {
      if (toolCategoryHelper[category].category === this.categoryName) {
        this.model.toolCategoryEnumerationNumber  = toolCategoryHelper[category].id;
      }
    }
    this.offerService.addOffer(this.model, this.currentUserId).subscribe(x => x);
  }
  getCategoriesNames() {
    return Object.values(ToolCategory);

  }
}

