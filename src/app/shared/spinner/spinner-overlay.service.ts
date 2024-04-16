import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {SpinnerComponent} from "./spinner.component";

@Injectable({
  providedIn: 'root'
})
export class SpinnerOverlayService {

  private overlayRef: OverlayRef | undefined;

  constructor(private overlay: Overlay) {}

  public show() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
      });

      const spinnerOverlayPortal = new ComponentPortal(SpinnerComponent);
      this.overlayRef.attach(spinnerOverlayPortal);
    }
  }

  public hide() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = undefined;
    }
  }

}
