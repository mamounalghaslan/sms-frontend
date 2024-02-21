import {Component, OnInit} from '@angular/core';
import {Notification} from "../../models/Notification";
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {

  displayedColumns: string[] = ['productName', 'errorType', 'shelf', 'section', 'actions'];
  dataSource: Notification[] = [];

  constructor(private service: NotificationsService) {
  }

  ngOnInit() {
    this.dataSource = this.service.getNotifications();
  }

}
