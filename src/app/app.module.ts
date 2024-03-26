import {NgModule} from '@angular/core';
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
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const routes = [
  {path: '', component: LoginComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'cameras', loadChildren: () => import('./containers/cameras/cameras.module').then(m => m.CamerasModule)},
  {path: 'products', component: ProductsComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'model', component: ModelComponent},
  {path: '**', redirectTo: 'notifications'}
]

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
    provideAnimationsAsync()
  ]
})
export class AppModule { }
