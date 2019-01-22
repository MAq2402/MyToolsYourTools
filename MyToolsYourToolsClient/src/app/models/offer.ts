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
}
