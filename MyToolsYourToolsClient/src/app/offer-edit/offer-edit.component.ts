import { Component, OnInit, Input } from '@angular/core';
import { Offer } from '../models/Offer';
import { OfferService } from '../services/offer.service';
import { Group } from '../models/Group';
import { ToolCategory } from '../enums/tool-category';
import { toolCategoryHelper } from '../offer-creator/tool-category-helper';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css']
})
export class OfferEditComponent implements OnInit {
  @Input() model: Offer;
  @Input() groups: Group[];
 //  @Input() categories: string[];
  categoryName: string = "Kosiarka";
  toolCategoryHelper: any;
  constructor(private offerService: OfferService) { }

  ngOnInit() {
    // this.category = toolCategoryHelper[this.model.toolCategory]['category'];
    this.toolCategoryHelper = toolCategoryHelper;
    this.categoryName = toolCategoryHelper[this.model.toolCategory]['category'];
    console.log(this.categoryName);
    console.log(this.categoryName);
  }

  getCategoriesNames() {
    return Object.values(ToolCategory);
  }
  // editGroup() {
  //   this.offerService.
  // }
  editOffer() {
    console.log('weszlo');
    this.offerService.updateOffer(this.model.id, this.model);
  }
}
