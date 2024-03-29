import {Injector, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {AppComponent} from "./app.component";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {NotificationsComponent} from "./components/notifications/notifications.component";
import {ProductsComponent} from "./components/products/products.component";
import {EmployeesComponent} from './components/employees/employees.component';
import {ModelComponent} from "./components/model/model.component";
import {SharedModule} from "./shared.module";
import {BrowserModule} from "@angular/platform-browser";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SnackbarInterceptor} from "./snackbar/snackbar-interceptor";
import {ShelfImagesListingComponent} from "./containers/shelf-images/shelf-images-listing/shelf-images-listing.component";

const routes = [
  {path: '', component: LoginComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'cameras', loadChildren: () =>
      import('./containers/cameras/cameras.module').then(m => m.CamerasModule)},
  {path: 'products', component: ProductsComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'model', component: ModelComponent},
  {path: 'shelf-images', loadChildren: () =>
      import('./containers/shelf-images/shelf-images.module').then(m => m.ShelfImagesModule)},
  {path: '**', redirectTo: 'notifications'}
]

export class AppInjector {
  private static injector: Injector;

  static setInjector(injector: Injector) {
    AppInjector.injector = injector;
  }

  static getInjector(): Injector {
    return AppInjector.injector;
  }
}

@NgModule({
    imports: [
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(routes),
      SharedModule
    ],
  declarations: [
    AppComponent,
    LoginComponent,
    NotificationsComponent,
    ProductsComponent,
    EmployeesComponent,
    ModelComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, useClass: SnackbarInterceptor, multi: true}
  ]
})
export class AppModule {
  constructor(injector: Injector) {
    AppInjector.setInjector(injector);
  }
}
