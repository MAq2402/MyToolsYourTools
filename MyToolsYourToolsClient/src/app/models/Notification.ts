import { NotificationType } from '../enums/NotificationType';

export class Notification {
  id: number;
  ownerId: number;
  targetNotificationUserId: number;
  targetNotificationUserName: string;
  offerId: number;
  offerName: string;
  type: NotificationType;
}
