import { NotificationType } from '../enums/NotificationType';

export class NotificationForCreation {
  ownerId: string;
  targetUserId: string;
  offerId: string;
  type: NotificationType;
}
