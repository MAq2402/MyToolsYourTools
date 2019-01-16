import {OfferStatus} from '../enums/OfferStatus';

export class Offer {
  id: number;
  name: string;
  category: string;
  description: string;
  imgSrc: string;
  status: OfferStatus;
  groupId: number;
  ownerId: number;

  constructor(name, category, description, groupId) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.groupId = groupId;
  }
}
