import {NgModule} from "@angular/core";
import {CamerasListingComponent} from "./cameras-listing/cameras-listing.component";
import {SharedModule} from "../../shared.module";
import {CamerasComponent} from "./cameras.component";
import {RouterModule} from "@angular/router";

const routes = [
  {path: 'cameras-listing', component: CamerasListingComponent},
  {path: '**', redirectTo: 'cameras-listing'}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    CamerasComponent,
    CamerasListingComponent
  ]
})
export class CamerasModule {
}
