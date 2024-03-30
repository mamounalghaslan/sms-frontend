import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: '<mat-progress-spinner mode="indeterminate"></mat-progress-spinner>',
  styles: [`
    :host {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `]
})
export class SpinnerComponent {}
