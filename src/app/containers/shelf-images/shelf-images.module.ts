import {ShelfImagesListingComponent} from "./shelf-images-listing/shelf-images-listing.component";
import {SharedModule} from "../../shared.module";
import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ShelfImageEditingComponent} from "./shelf-image-editing/shelf-image-editing.component";
import {ProductReferenceAnnotationComponent} from "../../components/product-references/product-reference-annotation.component";

const routes = [
  { path: 'listing', component: ShelfImagesListingComponent },
  { path: 'edit/:shelfImageId', component: ShelfImageEditingComponent },
  { path: '**', redirectTo: 'listing' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ProductReferenceAnnotationComponent
  ],
  declarations: [
    ShelfImagesListingComponent,
    ShelfImageEditingComponent
  ]
})
export class ShelfImagesModule {

}
