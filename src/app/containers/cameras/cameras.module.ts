import {NgModule} from "@angular/core";
import {CamerasListingComponent} from "./cameras-listing/cameras-listing.component";
import {SharedModule} from "../../shared.module";
import {RouterModule} from "@angular/router";
import {CameraConsoleComponent} from "./camera-console/camera-console.component";
import {ProductReferenceAnnotationComponent} from "../../components/product-references/product-reference-annotation.component";

const routes = [
  {path: 'cameras-listing', component: CamerasListingComponent},
  {path: 'console/:cameraId', component: CameraConsoleComponent},
  {path: '**', redirectTo: 'cameras-listing'}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ProductReferenceAnnotationComponent
  ],
  declarations: [
    CamerasListingComponent,
    CameraConsoleComponent
  ]
})
export class CamerasModule {
}
