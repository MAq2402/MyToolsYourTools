import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRentRequestComponent } from './approve-rent-request.component';

describe('ApproveRentRequestComponent', () => {
  let component: ApproveRentRequestComponent;
  let fixture: ComponentFixture<ApproveRentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveRentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
