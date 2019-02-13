import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Group } from '../models/Group';
import { ToolCategory } from '../enums/tool-category';

@Component({
  selector: 'app-offers-bar',
  templateUrl: './offers-bar.component.html',
  styleUrls: ['./offers-bar.component.css']
})
export class OffersBarComponent implements OnInit {
  @Output() searchQueryEmitter = new EventEmitter<string>();

  @Input() groups: Group[];
  @Output() selectedGroupEmmitter = new EventEmitter<string>();

  @Output() selectedCategoryEmmitter = new EventEmitter<string>();
  categories = ToolCategory;
  categoryNames = [];
  selectedCategory: String = 'Wszystkie';
  selectedGroup: String = 'Wszystkie';

  constructor() {
    this.categoryNames = Object.keys(ToolCategory);
  }

  ngOnInit() {}

  onKey(event: any) {
    this.searchQueryEmitter.emit(event.target.value);
  }

  onGroupSelect(groupId: string) {
    this.selectedGroupEmmitter.emit(groupId);
    if (groupId) {
      for (const g of this.groups) {
        if (g.id === groupId) {
          this.selectedGroup = g.name;
        }
      }
    } else {
      this.selectedGroup = 'Wszystkie';
    }
  }
  onCategorySelect(category: ToolCategory) {
    this.selectedCategoryEmmitter.emit(category);

    if (category) {
      this.selectedCategory = category.toString();
    } else {
      this.selectedCategory = 'Wszystkie';
    }
  }
}
