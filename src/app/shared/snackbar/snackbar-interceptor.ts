import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SnackbarService } from "./snackbar-service";

@Injectable()
export class SnackbarInterceptor implements HttpInterceptor {

  constructor(private snackbarService: SnackbarService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const useSnackbar = req.headers.get('X-Use-Snackbar');

    const httpRequest = req.clone({
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
      })
    });

    return next.handle(httpRequest)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse && useSnackbar) {
            // Check for custom success message
            const successMessage = req.headers.get('X-Success-Message');
            this.snackbarService.show(successMessage || 'Request successful', 'OK', 5000);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          // Check for custom error message
          const errorMessageHeader = req.headers.get('X-Error-Message');
          let errorMessage = errorMessageHeader || 'An error occurred';
          if (!errorMessageHeader) {
            if (error.error instanceof ErrorEvent) {
              errorMessage = `Error: ${error.error.message}`;
            } else {
              errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
            }
          }
          this.snackbarService.show(errorMessage, 'Error', 5000);
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
