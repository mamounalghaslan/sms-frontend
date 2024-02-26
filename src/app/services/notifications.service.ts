import { Injectable } from '@angular/core';
import {Notification} from "../models/Notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  getNotifications(): Notification[] {
    return [];
  }

}
