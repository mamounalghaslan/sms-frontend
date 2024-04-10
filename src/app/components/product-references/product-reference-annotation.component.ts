import {ShelfImage} from "../../models/ShelfImage";
import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {ShelfImageService} from "../../services/shelf-image.service";
import {ProductReference} from "../../models/ProductReference";
import {SharedModule} from "../../shared.module";

import {Annotorious} from '@recogito/annotorious';
import {ImageLoadedDirective} from "../../directives/image-loaded.directive";
import {Observable} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-product-reference-annotation',
  imports: [
    SharedModule,
    ImageLoadedDirective
  ],
  templateUrl: './product-reference-annotation.component.html'
})
export class ProductReferenceAnnotationComponent implements OnInit {

  displayedColumns: string[] = ['systemId', 'product', 'x1', 'y1', 'x2', 'y2'];

  productReferences: ProductReference[] = [];
  newProductReferences: ProductReference[] = [];
  deletedProductReferences: ProductReference[] = [];

  hoveredProductReferenceId: number = 0;
  selectedProductReferenceId: number = 0;

  productReferencesObservable: Observable<ProductReference[]> | undefined;

  @Input()
  shelfImage: ShelfImage | undefined;

  @Input()
  editable: boolean = false;

  @ViewChild('refImage')
  refImage: ElementRef | undefined;

  annotorious: any;

  newProductReferenceId = -1;

  constructor(public service: ShelfImageService) {
  }

  ngOnInit() {
    this.productReferencesObservable =
      this.service.getProductReferencesByShelfImage(this.shelfImage?.systemId!);
  }

  initializeAnnotorious(): void {

    this.annotorious = new Annotorious({
      image: this.refImage?.nativeElement,
      handleRadius: 4
    });

    this.annotorious.on('mouseEnterAnnotation', (annotation: any) => {
      this.hoveredProductReferenceId = annotation.id;
    });

    this.annotorious.on('mouseLeaveAnnotation', () => {
      this.hoveredProductReferenceId = 0;
    });

    this.annotorious.on('clickAnnotation', (annotation: any) => {
      this.selectedProductReferenceId = annotation.id;
    });

    this.annotorious.on('cancelSelected', () => {
      this.selectedProductReferenceId = 0;
    });

    this.annotorious.on('changeSelected', (selection: any) => {
      this.selectedProductReferenceId = selection.id;
    });

    this.annotorious.on('updateAnnotation', (selection: any) => {

      const coordinates = this.getCoordinates(selection);

      let isUdapted = false;

      let productReference = this.productReferences.find(
        (productReference: ProductReference) => productReference.systemId === selection.id);

      if(!productReference) {
        isUdapted = true;
        productReference = this.newProductReferences.find(
          (productReference: ProductReference) => productReference.systemId === selection.id);
      }

      if(productReference) {
        productReference.x1 = coordinates.x1;
        productReference.y1 = coordinates.y1;
        productReference.x2 = coordinates.x2;
        productReference.y2 = coordinates.y2;
      } else {
        // something weird happened
        return;
      }

      // if it hasn't been updated before
      if(!isUdapted) {

        this.productReferences = this.productReferences.filter(
          (productReference: ProductReference) => productReference.systemId !== selection.id);
        this.newProductReferences.push(productReference);
        this.newProductReferences = [...this.newProductReferences];

      }

      this.selectedProductReferenceId = selection.id;

    });

    this.annotorious.on('deleteAnnotation', (annotation: any) => {

      let productReference = this.productReferences.find(
        (productReference: ProductReference) => productReference.systemId === annotation.id);

      if(productReference) {

        this.productReferences = this.productReferences.filter(
          (productReference: ProductReference) => productReference.systemId !== annotation.id);

      } else {

        productReference = this.newProductReferences.find(
          (productReference: ProductReference) => productReference.systemId === annotation.id);

        if(productReference) {

          this.newProductReferences = this.newProductReferences.filter(
            (productReference: ProductReference) => productReference.systemId !== annotation.id);

        }

      }

      if(productReference && productReference.systemId > 0) {

        this.deletedProductReferences.push(productReference);
        this.deletedProductReferences = [...this.deletedProductReferences];

      }

    });

    this.annotorious.on('createSelection', (selection: any) => {

      const coordinates = this.getCoordinates(selection);

      const newProductReference: ProductReference = {
        systemId: this.newProductReferenceId--,
        product: undefined,
        shelfImage: this.shelfImage,
        imageFileName: undefined,
        x1: coordinates.x1,
        y1: coordinates.y1,
        x2: coordinates.x2,
        y2: coordinates.y2
      };

      // add the new product reference to the list at the beginning
      this.newProductReferences.unshift(newProductReference);
      // create a new array reference to refresh the data table
      this.newProductReferences = [...this.newProductReferences];

      this.annotorious.addAnnotation(this.createAnnotation(newProductReference));
      this.annotorious.cancelSelected();

    });


    this.productReferencesObservable?.subscribe((productReferences: ProductReference[]) => {
      this.productReferences = productReferences;
      for (let productReference of this.productReferences) {
        this.annotorious.addAnnotation(this.createAnnotation(productReference));
      }
    });

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

  getCoordinates(annotation: any) {
    const selector = annotation.target.selector;
    const xywh = selector.value.split('=pixel:')[1].split(',');
    return {
      x1: parseInt(xywh[0]),
      y1: parseInt(xywh[1]),
      x2: parseInt(xywh[0]) + parseInt(xywh[2]),
      y2: parseInt(xywh[1]) + parseInt(xywh[3])
    };
  }

  styleTableRow(productReference: ProductReference) {
    if(productReference.systemId === this.selectedProductReferenceId) {
      return {
        'background-color': 'lightblue'
      }
    }
    if(productReference.systemId === this.hoveredProductReferenceId) {
      return {
        'background-color': 'aliceblue'
      }
    }
    return {};
  }

}
