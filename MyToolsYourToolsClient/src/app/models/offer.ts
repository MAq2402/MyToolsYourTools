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
}
