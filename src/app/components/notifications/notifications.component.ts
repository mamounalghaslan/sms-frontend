import { Component } from '@angular/core';
import {Notification} from "../../models/Notification";

const ELEMENT_DATA: Notification[] = [
  {productName: 'product name 1', errorType: 'Out of Stock', shelf: '12', section: 'A'},
  {productName: 'product name 2', errorType: 'Out of Stock', shelf: '15', section: 'B'},
  {productName: 'product name 3', errorType: 'Misplaced', shelf: '7', section: 'C'},
  {productName: 'product name 4', errorType: 'Misplaced', shelf: '12', section: 'D'}
];

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent {

  displayedColumns: string[] = ['productName', 'errorType', 'shelf', 'section', 'actions'];
  dataSource = ELEMENT_DATA;

}
