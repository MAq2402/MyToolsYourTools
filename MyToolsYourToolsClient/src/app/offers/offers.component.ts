import { Component, OnInit } from "@angular/core";
import { OfferService } from "../services/offer.service";
import { Offer } from "../models/offer";
import { Group } from "../models/Group";
import { GroupService } from "../services/group.service";
import { ToolCategory } from '../enums/tool-category';
import { OfferStatus } from '../enums/OfferStatus';

@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.css"]
})
export class OffersComponent implements OnInit {
  offers: Offer[];
  searchedOffers: Offer[];
  currentSearch: String;
  login;
  currentGroupId: string;
  currentUserId: string;

  currentCategory: ToolCategory;
  groups: Group[];
  categories: ToolCategory;
  constructor(
    private offerService: OfferService,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.currentUserId = localStorage.getItem('auth_key');
    this.offerService.getOffersForUserGroups(this.currentUserId).subscribe(o => {
      this.offers = o;
      this.searchedOffers = this.offers;
    });
    this.groupService
      .getUserGroups(this.currentUserId)
      .subscribe(o => (this.groups = o));
  }
  searchAndFilter() {
    this.searchedOffers = this.offers;
    if (this.currentSearch) {
      this.searchedOffers = this.searchedOffers.filter(o =>
          o.tool.toLowerCase().includes(this.currentSearch.toLowerCase())
        );
    }
    if (this.currentGroupId) {
      this.searchedOffers = this.searchedOffers.filter(o => o.groupId === this.currentGroupId);
    }
    if (this.currentCategory) {
      this.searchedOffers = this.searchedOffers.filter(o => Object.values(ToolCategory)[o.toolCategory] === this.currentCategory);
    }
  }

  onSearched(searchQuery: String) {
    if (searchQuery) {
      this.currentSearch = searchQuery;
    } else {
      this.currentSearch = null;
    }
    this.searchAndFilter();
  }

  onGroup(groupId: string) {
    this.currentGroupId = groupId;
    this.searchAndFilter();
  }

  onCategorySelected(category: ToolCategory) {
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
