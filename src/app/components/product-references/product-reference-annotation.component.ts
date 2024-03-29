import {ShelfImage} from "../../models/ShelfImage";
import {Component, Input, OnInit} from "@angular/core";
import {ShelfImageService} from "../../services/shelf-image.service";
import {ProductReference} from "../../models/ProductReference";
import {SharedModule} from "../../shared.module";

@Component({
  standalone: true,
  selector: 'app-product-reference-annotation',
  imports: [
    SharedModule
  ],
  templateUrl: './product-reference-annotation.component.html'
})
export class ProductReferenceAnnotationComponent implements OnInit {

  displayedColumns: string[] = ['product', 'x1', 'y1', 'x2', 'y2'];
  productReferences: ProductReference[] = [];

  @Input()
  shelfImage: ShelfImage | undefined;

  @Input()
  editable: boolean = false;

  constructor(private service: ShelfImageService) {
  }

  ngOnInit() {
    this.service.getProductReferencesByShelfImage(this.shelfImage?.systemId!)
      .subscribe((productReferences: ProductReference[]) => {
        this.productReferences = productReferences
      });
  }

}
