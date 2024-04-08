import {ShelfImage} from "../../models/ShelfImage";
import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {ShelfImageService} from "../../services/shelf-image.service";
import {ProductReference} from "../../models/ProductReference";
import {SharedModule} from "../../shared.module";

import {Annotorious} from '@recogito/annotorious';

@Component({
  standalone: true,
  selector: 'app-product-reference-annotation',
  imports: [
    SharedModule
  ],
  templateUrl: './product-reference-annotation.component.html'
})
export class ProductReferenceAnnotationComponent implements OnInit {

  // TODO: Get the image dimenstions from the backend

  displayedColumns: string[] = ['product', 'x1', 'y1', 'x2', 'y2'];
  productReferences: ProductReference[] = [];
  hoveredProductReference: ProductReference | undefined;
  selectedProductReference: ProductReference | undefined;

  @Input()
  shelfImage: ShelfImage | undefined;

  @Input()
  editable: boolean = false;

  @ViewChild('refImage')
  refImage: ElementRef | undefined;

  annotorious: any;

  constructor(public service: ShelfImageService) {
  }

  ngOnInit() {
    this.service.getProductReferencesByShelfImage(this.shelfImage?.systemId!)
      .subscribe((productReferences: ProductReference[]) => {
        this.productReferences = productReferences;
      });
    setTimeout(() => {
      this.annotorious = new Annotorious({
        image: this.refImage?.nativeElement,
        disabledEditor: true,
        crosshair: true
      });
      this.annotorious.on('mouseEnterAnnotation', (annotation: any) => {
        this.hoveredProductReference = this.productReferences.find(
          (productReference: ProductReference) => productReference.systemId === annotation.id);
      })
      this.annotorious.on('clickAnnotation', (annotation: any) => {
        this.selectedProductReference = this.productReferences.find(
          (productReference: ProductReference) => productReference.systemId === annotation.id);
      })
      for(let productReference of this.productReferences) {
        this.annotorious.addAnnotation(this.createAnnotation(productReference));
      }
    }, 50);
  }

  createAnnotation(productReference: ProductReference) {

    // Extract the coordinates
    const x1 = productReference.x1;
    const y1 = productReference.y1;
    const x2 = productReference.x2;
    const y2 = productReference.y2;

    // Calculate width and height from the coordinates
    const width = x2 - x1;
    const height = y2 - y1;

    // Construct the annotation object
    return {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "type": "Annotation",
      "body": [
        {
          "type": "TextualBody",
          "value": "Enter your annotation text here",
          "purpose": "commenting"
        }
      ],
      "target": {
        "source": "",
        "selector": {
          "type": "FragmentSelector",
          "conformsTo": "http://www.w3.org/TR/media-frags/",
          "value": `xywh=pixel:${x1},${y1},${width},${height}`
        }
      },
      "id": productReference.systemId
    };
  }

  styleTableRow(productReference: ProductReference) {
    if(productReference === this.selectedProductReference) {
      return {
        'background-color': 'lightblue'
      }
    }
    if(productReference === this.hoveredProductReference) {
      return {
        'background-color': 'aliceblue'
      }
    }
    return {};
  }

}
