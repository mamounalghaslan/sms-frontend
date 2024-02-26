import {Product} from "./Product";
import {NotificationStatusType} from "./NotificationStatusType";
import {NotificationErrorType} from "./NotificationErrorType";

export interface Notification {

  systemId: number;
  product: Product;
  notificationErrorType: NotificationErrorType;
  statusType: NotificationStatusType;
  location: string;

}
