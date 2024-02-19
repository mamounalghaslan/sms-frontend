import { Component } from '@angular/core';

export interface Notification {
  productName: string;
  shelfName: string;
  sectionName: string;
}

const ELEMENT_DATA: Notification[] = [
  {productName: 'product name 1', shelfName: '12', sectionName: 'A'},
  {productName: 'product name 2', shelfName: '15', sectionName: 'B'},
  {productName: 'product name 3', shelfName: '7', sectionName: 'C'},
  {productName: 'product name 4', shelfName: '12', sectionName: 'D'}
];

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent {
  displayedColumns: string[] = ['productName', 'shelfName', 'sectionName', 'actions'];
  dataSource = ELEMENT_DATA;
}
