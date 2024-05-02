import {ShelfImage} from "../../models/ShelfImage";
import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {ShelfImageService} from "../../services/shelf-image.service";
import {SharedModule} from "../../shared.module";

import {Annotorious} from '@recogito/annotorious';
import {ImageLoadedDirective} from "../../directives/image-loaded.directive";
import {Observable} from "rxjs";
import {Product} from "../../models/Product";
import {ProductsService} from "../../services/products.service";
import {MisplacedProductReference} from "../../models/MisplacedProductReference";
import {ProductReference} from "../../models/ProductReference";
import {CamerasService} from "../../services/cameras.service";

@Component({
  standalone: true,
  selector: 'app-misplaced-product-reference',
  imports: [
    SharedModule,
    ImageLoadedDirective
  ],
  templateUrl: './misplaced-product-reference.component.html'
})
export class MisplacedProductReferenceComponent implements OnInit {

  misDisplayedColumns: string[] = ['misplacedProduct', 'detectedProduct', 'x1', 'y1', 'x2', 'y2'];
  oosDisplayedColumns: string[] = ['oosProduct', 'x1', 'y1', 'x2', 'y2'];

  misplacedProductReferences: MisplacedProductReference[] = [];
  hoveredMisplacedProductReferenceId: number = 0;
  misplacedProductReferencesObservable: Observable<MisplacedProductReference[]> | undefined;

  totalProductsCount: number = 0;
  health: number = 0;

  @Input()
  shelfImage: ShelfImage | undefined;

  @ViewChild('refImage')
  refImage: ElementRef | undefined;

  productsList: Product[] = [];

  annotorious: any;

  constructor(public shelfImageService: ShelfImageService,
              public productsService: ProductsService,
              public camerasService: CamerasService) {
  }

  ngOnInit() {
    this.misplacedProductReferencesObservable =
      this.shelfImageService.getMisplacedProductReferencesByShelfImage(this.shelfImage?.systemId!);

    this.productsService.getAllProducts().subscribe((products: Product[]) => {
      this.productsList = products;
    });
  }

  initializeAnnotorious(): void {

    this.annotorious = new Annotorious({
      image: this.refImage?.nativeElement,
      handleRadius: 4,
      readOnly: true,
      formatter: this.formatAnnotation
    });

    this.annotorious.on('mouseEnterAnnotation', (annotation: any) => {
      this.hoveredMisplacedProductReferenceId = annotation.id;
    });

    this.annotorious.on('mouseLeaveAnnotation', () => {
      this.hoveredMisplacedProductReferenceId = 0;
    });

    this.misplacedProductReferencesObservable?.subscribe((misplacedProductReferences: MisplacedProductReference[]) => {

      this.misplacedProductReferences = misplacedProductReferences;

      for (let misplacedProductReference of this.misplacedProductReferences) {
        this.annotorious.addAnnotation(this.createAnnotation(misplacedProductReference));
      }

      this.camerasService.getCameraReferenceImage(this.shelfImage?.referencedCamera?.systemId!)
        .subscribe((shelfImage: ShelfImage) => {
          this.shelfImageService.getProductReferencesByShelfImage(shelfImage.systemId!)
            .subscribe((productReferences: ProductReference[]) => {
              this.totalProductsCount = productReferences.length;
              // Calculate the health of the shelf and round to 2 decimal places
              this.health = Math.round((1 - this.misplacedProductReferences.length / this.totalProductsCount) * 100);
            });
        });

    });

  }

  createAnnotation(misplacedProductReference: MisplacedProductReference) {
    // Extract the coordinates
    const x1 = misplacedProductReference.x1;
    const y1 = misplacedProductReference.y1;
    const x2 = misplacedProductReference.x2;
    const y2 = misplacedProductReference.y2;

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
      "id": misplacedProductReference.systemId,
      "statusType": misplacedProductReference.detectedProduct? 'MIS' : 'OOS'
    };
  }

  styleTableRow(misplacedProductReference: MisplacedProductReference) {
    if(misplacedProductReference.systemId === this.hoveredMisplacedProductReferenceId) {
      return {
        'background-color': 'aliceblue'
      }
    }
    return {};
  }

  formatAnnotation(annotation: any): any {
    if(annotation.underlying.statusType === 'MIS') {
      return {
        'style': 'stroke-width:2; stroke: yellow'
      }
    } else if(annotation.underlying.statusType === 'OOS') {
      return {
        'style': 'stroke-width:2; stroke: red'
      }
    }
  }

  filterMisplacedProductReferences(type: string): MisplacedProductReference[] {
    if(type === 'MIS') {
      return this.misplacedProductReferences.filter(misplacedProductReference =>
        misplacedProductReference.detectedProduct);
    }
    return this.misplacedProductReferences.filter(misplacedProductReference =>
      !misplacedProductReference.detectedProduct);
  }

}
