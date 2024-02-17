import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppServiceService} from "./app-service.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'sms-frontend';
  // use the service
  public service: AppServiceService;
  constructor(service: AppServiceService) {
    this.service = service;
  }
  // use the service
  ngOnInit() {
    this.service.getTitle().subscribe((data: string) => this.title = data);
  }
}
