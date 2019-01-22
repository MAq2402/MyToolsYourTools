import {OfferStatus} from '../enums/OfferStatus';

export class Offer {
  id: string;
  name: string;
  category: string;
  description: string;
  imgSrc: string;
  status: OfferStatus;
  groupId: string;
  ownerId: string;

  constructor(name, category, description, imageSrc, groupId) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.groupId = groupId;
    this.imgSrc = imageSrc;
  }
}
