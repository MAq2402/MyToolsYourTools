import {OfferStatus} from '../enums/OfferStatus';

export class Offer {
  name: string;
  category: string;
  description: string;
  imgSrc: string;
  status: OfferStatus;
  groupId: number;
  ownerId: number;
}
