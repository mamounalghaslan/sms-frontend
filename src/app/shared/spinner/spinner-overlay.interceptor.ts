import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerOverlayService } from './spinner-overlay.service';

@Injectable()
export class SpinnerOverlayInterceptor implements HttpInterceptor {
  private activeRequests: number = 0;

  constructor(private spinnerOverlayService: SpinnerOverlayService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.activeRequests === 0) {
      this.spinnerOverlayService.show();
    }
    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.spinnerOverlayService.hide();
        }
      })
    );
  }

}