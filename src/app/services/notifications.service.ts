import { Injectable } from '@angular/core';
import {Notification} from "../models/Notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  getNotifications(): Notification[] {
    return [
      {systemId: 1, productName: 'product name 1', errorType: 'Out of Stock', shelf: '12', section: 'A'},
      {systemId: 2, productName: 'product name 2', errorType: 'Out of Stock', shelf: '15', section: 'B'},
      {systemId: 3, productName: 'product name 3', errorType: 'Misplaced', shelf: '7', section: 'C'},
      {systemId: 4, productName: 'product name 4', errorType: 'Misplaced', shelf: '12', section: 'D'}
    ];
  }

}
