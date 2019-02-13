import { NotificationType } from '../enums/NotificationType';

export class Notification {
  id: string;
  ownerId: string;
  targetUserId: string;
  targetNotificationUserName: string;
  offerId: string;
  offerName: string;
  type: NotificationType;
}
