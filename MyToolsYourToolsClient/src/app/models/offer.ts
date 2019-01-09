import {OfferStatus} from '../enums/OfferStatus';
import {Category} from '../enums/Category';

export class Offer {
  id: number;
  name: string;
  category: Category;
  description: string;
  imgSrc: string;
  status: OfferStatus;
  groupId: number;
  ownerId: number;
}
