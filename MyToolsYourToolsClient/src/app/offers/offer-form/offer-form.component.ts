import { Component, OnInit } from '@angular/core';
import { Offer } from '../../models/offer';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit {
  model: Offer = {
    name: '',
    category: '',
    description: '',
    imgSrc: 'https://cdn2.iconfinder.com/data/icons/ballicons-2-free/100/wrench-512.png',
    status: 1,
    groupId: 1,
    ownerId:  1,
  };
  constructor(private offerService: OfferService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.offerService.addOffer(this.model).subscribe();
  }

}
