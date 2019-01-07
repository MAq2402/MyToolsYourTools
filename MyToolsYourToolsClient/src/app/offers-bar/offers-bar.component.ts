import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-offers-bar',
  templateUrl: './offers-bar.component.html',
  styleUrls: ['./offers-bar.component.css']
})
export class OffersBarComponent implements OnInit {

  @Output() searchQueryEmitter = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onKey(event: any) {
    this.searchQueryEmitter.emit(event.target.value);
  }

}
