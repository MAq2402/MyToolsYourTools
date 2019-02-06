import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() private dataCount = 0;
  @Input() private itemsCountPerPage = 5;

  private fromIndex = 0;
  protected nextButtonDisabled = false;
  protected prevButtonDisabled = true;

  constructor() {}

  public refreshPagination(newCountOfDataToDisplay: number) {
    this.dataCount = newCountOfDataToDisplay;
    this.fromIndex = 0;
    this.checkDisabledNavButtons(this.fromIndex);
  }

  public getSlicedDataArray(dataArray: any[]): any[] {
    return dataArray.slice(this.fromIndex, this.fromIndex + this.itemsCountPerPage);
  }

  private nextPage() {
    const nextStep = this.fromIndex + this.itemsCountPerPage;
    if (nextStep < this.dataCount) {
      this.fromIndex = nextStep;
      this.checkDisabledNavButtons(this.fromIndex);
    }
  }

  private prevPage() {
    const backStep = this.fromIndex - this.itemsCountPerPage;
    if (backStep >= 0) {
      this.fromIndex = backStep;
      this.checkDisabledNavButtons(this.fromIndex);
    }
  }

  private checkDisabledNavButtons(length: number) {
    if (length + this.itemsCountPerPage >= this.dataCount) {
      this.nextButtonDisabled = true;
    } else {
      this.nextButtonDisabled = false;
    }
    if (length - this.itemsCountPerPage < 0) {
      this.prevButtonDisabled = true;
    } else {
      this.prevButtonDisabled = false;
    }
  }

  private showNavButtons() {
    return this.dataCount > this.itemsCountPerPage;
  }

}
