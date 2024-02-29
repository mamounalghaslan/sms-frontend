import {NotificationStatusType} from "./NotificationStatusType";
import {NotificationErrorType} from "./NotificationErrorType";
import {Product} from "./Product";

export interface Notification {

  systemId: number;
  product: Product;
  errorType: NotificationErrorType;
  statusType: NotificationStatusType;

  location: string;

}
