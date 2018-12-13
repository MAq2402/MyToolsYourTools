import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersBarComponent } from './offers-bar.component';

describe('OffersBarComponent', () => {
  let component: OffersBarComponent;
  let fixture: ComponentFixture<OffersBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
