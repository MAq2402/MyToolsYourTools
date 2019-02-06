import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() private dataCount = 0;
  @Input() private stepIndex = 5;

  private fromIndex = 0;
  private nextButtonDisabled = false;
  private prevButtonDisabled = true;

  constructor() { }

  ngOnInit() {
  }

  public refreshPagination(newCountOfDataToDisplay: number) {
    this.dataCount = newCountOfDataToDisplay;
    this.fromIndex = 0;
    this.checkDisabledNavButtons(this.fromIndex);
  }

  public getSlicedDataArray(dataArray: any[]): any[] {
    return dataArray.slice(this.fromIndex, this.fromIndex + this.stepIndex);
  }

  private nextPage() {
    const nextStep = this.fromIndex + this.stepIndex;
    if (nextStep < this.dataCount) {
      this.fromIndex = nextStep;
      this.checkDisabledNavButtons(this.fromIndex);
    }
  }

  private prevPage() {
    const backStep = this.fromIndex - this.stepIndex;
    if (backStep >= 0) {
      this.fromIndex = backStep;
      this.checkDisabledNavButtons(this.fromIndex);
    }
  }

  private checkDisabledNavButtons(length: number) {
    if (length + this.stepIndex >= this.dataCount) {
      this.nextButtonDisabled = true;
    } else {
      this.nextButtonDisabled = false;
    }
    if (length - this.stepIndex < 0) {
      this.prevButtonDisabled = true;
    } else {
      this.prevButtonDisabled = false;
    }
  }

  private showNavButtons() {
    return this.dataCount > this.stepIndex;
  }

}
