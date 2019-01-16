import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Group } from '../models/Group';
import { Category } from '../enums/Category';

@Component({
  selector: 'app-offers-bar',
  templateUrl: './offers-bar.component.html',
  styleUrls: ['./offers-bar.component.css']
})
export class OffersBarComponent implements OnInit {

  @Output() searchQueryEmitter = new EventEmitter<string>();
  @Input() groups:Group[];
  @Output() selectedGroupEmmitter = new EventEmitter<number>();
  @Output() selectedCategoryEmmitter = new EventEmitter<string>();
  categories = Category;
  categoryNames = [];

  constructor() { 
    this.categoryNames = Object.keys(Category);
  }

  ngOnInit() {
  }

  onKey(event: any) {
    this.searchQueryEmitter.emit(event.target.value);
  }
  onGroupSelect(event: number){
    
    this.selectedGroupEmmitter.emit(event);
  }


}
