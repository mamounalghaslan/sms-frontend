import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {AppInjector} from "../app.module";
import {SnackbarService} from "./snackbar-service";

export function SnackbarMessage(successMessage: string, errorMessage: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      const snackbarService = AppInjector.getInjector().get(SnackbarService);

      return originalMethod.apply(this, args).pipe(
        tap(() => {
          if (successMessage) {
            snackbarService.show(successMessage);
          }
        }),
        catchError((error: any) => {
          if (errorMessage) {
            snackbarService.show(errorMessage);
          }
          return throwError(() => new Error(error));
        })
      );
    };

    return descriptor;
  };
}
