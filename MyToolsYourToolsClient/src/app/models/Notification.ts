import { NotificationType } from '../enums/NotificationType';

export class Notification {
  id: string;
  ownerId: string;
  targetNotificationUserId: string;
  targetNotificationUserName: string;
  offerId: string;
  offerName: string;
  type: NotificationType;
}
