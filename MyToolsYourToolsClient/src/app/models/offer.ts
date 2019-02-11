import {OfferStatus} from '../enums/OfferStatus';
import { ToolCategory } from '../enums/tool-category';
export class Offer {
  id: string;
  tool: string;
  toolCategory: ToolCategory;
  description: string;
  imageSource: string;
  status: OfferStatus;
  ownerId: string;
  groupId: string;
  toolCategoryEnumerationNumber: number;
}
