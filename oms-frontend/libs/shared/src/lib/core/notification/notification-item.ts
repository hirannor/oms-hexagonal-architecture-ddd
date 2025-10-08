import { NotificationSeverity } from './notification.service';

export interface NotificationItem {
  id: string;
  type: NotificationSeverity;
  title: string;
  message?: string;
  timestamp: Date;
  read: boolean;
}
