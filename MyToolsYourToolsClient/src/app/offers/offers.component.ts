import { Component, OnInit } from '@angular/core';
import { OfferService } from '../services/offer.service';
import { Offer } from '../models/offer';
import { Group } from '../models/Group';
import { GroupService } from '../services/group.service';
import { CurrencyIndex } from '@angular/common/src/i18n/locale_data';
import { Category } from '../enums/Category';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  activeOffers: Offer[];
  searchedOffers: Offer[];
  currentSearch: String;
  login;
  currentGroupId: string;



  currentCategory: Category;
  offers: Offer[];
  groups: Group[];
categories: Category;
  constructor(private offerService: OfferService, private groupService: GroupService) {
  }

  ngOnInit() {
    this.offerService.getOffers().subscribe(o => this.offers = o);
    this.offerService.getActiveOffers().subscribe(o => this.activeOffers = o);
    this.groupService.getGroups().subscribe(o => this.groups = o);
    this.searchedOffers = this.activeOffers;
  }
  searchAndFilter(){
    if(this.currentSearch&&this.currentGroupId&&this.currentCategory){
      this.searchedOffers = this.activeOffers.filter(o => o.name.toLowerCase().includes(this.currentSearch.toLowerCase()));

      this.searchedOffers = this.searchedOffers.filter(o => o.groupId==this.currentGroupId);
      this.searchedOffers = this.searchedOffers.filter(o => o.category==this.currentCategory);
    }
    else if(this.currentSearch&&this.currentCategory){
      this.searchedOffers = this.activeOffers.filter(o => o.name.toLowerCase().includes(this.currentSearch.toLowerCase()));
      this.searchedOffers = this.searchedOffers.filter(o => o.category==this.currentCategory);
    }
    else if(this.currentGroupId&&this.currentSearch){
      this.searchedOffers = this.activeOffers.filter(o => o.name.toLowerCase().includes(this.currentSearch.toLowerCase()));
      this.searchedOffers = this.searchedOffers.filter(o => o.groupId==this.currentGroupId);
    }
    else if(this.currentCategory&&this.currentGroupId){
      this.searchedOffers = this.activeOffers.filter(o => o.category==this.currentCategory);
      this.searchedOffers = this.searchedOffers.filter(o => o.groupId==this.currentGroupId);

    }
    else if(this.currentSearch){
      this.searchedOffers = this.activeOffers.filter(o => o.name.toLowerCase().includes(this.currentSearch.toLowerCase()));
    }
    else if(this.currentGroupId){

      this.searchedOffers = this.activeOffers.filter(o => o.groupId==this.currentGroupId);
    }
    else if(this.currentCategory){
      this.searchedOffers = this.activeOffers.filter(o => o.category==this.currentCategory);

    }
    else{
      this.searchedOffers = this.activeOffers;
    }
  }


  onSearched(searchQuery: String) {
    if (searchQuery) {
      this.currentSearch = searchQuery;
      this.searchAndFilter();
     }
  }

  onGroup(groupId: string){
      this.currentGroupId = groupId;
      this.searchAndFilter();
  }

  onCategorySelected(category: Category){
      this.currentCategory = category;
     this.searchAndFilter();

  }

  private searchGroupName(groupId) {
    for (const g of this.groups) {
      if (g.id === groupId) {
        return g.name;
      }
    }
    }

}
