import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersCreatorComponent } from './offers-creator.component';

describe('OffersCreatorComponent', () => {
  let component: OffersCreatorComponent;
  let fixture: ComponentFixture<OffersCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
