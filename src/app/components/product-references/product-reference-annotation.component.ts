import {ShelfImage} from "../../models/ShelfImage";
import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {ShelfImageService} from "../../services/shelf-image.service";
import {ProductReference} from "../../models/ProductReference";
import {SharedModule} from "../../shared.module";

import {Annotorious} from '@recogito/annotorious';
import {ImageLoadedDirective} from "../../directives/image-loaded.directive";
import {Observable} from "rxjs";
import {ProductReferenceParameters} from "../../models/ProductReferenceParameters";
import {Product} from "../../models/Product";
import {ProductsService} from "../../services/products.service";
import {FormControl} from "@angular/forms";
import {
  MisplacedProductReferenceComponent
} from "../misplaced-product-references/misplaced-product-reference.component";

@Component({
  standalone: true,
  selector: 'app-product-reference-annotation',
  imports: [
    SharedModule,
    ImageLoadedDirective,
    MisplacedProductReferenceComponent
  ],
  templateUrl: './product-reference-annotation.component.html'
})
export class ProductReferenceAnnotationComponent implements OnInit {

  displayedColumns: string[] = ['systemId', 'product', 'x1', 'y1', 'x2', 'y2'];

  productReferences: ProductReference[] = [];
  newProductReferences: ProductReference[] = [];
  deletedProductReferences: ProductReference[] = [];

  hoveredProductReferenceId = null;
  selectedProductReference: ProductReference | undefined;
  selectedProductReferenceIsUpdated: boolean = false;

  productReferencesObservable: Observable<ProductReference[]> | undefined;


  @Input()
  shelfImage: ShelfImage | undefined;

  @Input()
  editable: boolean = false;

  @Output()
  onProductReferenceParametersChange = new EventEmitter<ProductReferenceParameters>();

  @ViewChild('refImage')
  refImage: ElementRef | undefined;

  productsList: Product[] = [];
  filteredProductsList: Product[] = [];
  productSelectionControl: FormControl<Product | null> = new FormControl(null);

  @ViewChild('productInput')
  input: ElementRef<HTMLInputElement> | undefined;

  annotorious: any;

  newProductReferenceId = -1;


  constructor(public shelfImageService: ShelfImageService,
              public productsService: ProductsService) {
  }

  ngOnInit() {
    this.productReferencesObservable =
      this.shelfImageService.getProductReferencesByShelfImage(this.shelfImage?.systemId!);

    this.productsService.getAllProducts().subscribe((products: Product[]) => {
      this.productsList = products;
      this.filteredProductsList = this.productsList.slice();
    });

    this.productSelectionControl.valueChanges.subscribe(() => {
      this.setProduct();
    });

    this.productSelectionControl.reset();
    this.productSelectionControl.disable({emitEvent: false});
  }

  emitChanges() {
    this.onProductReferenceParametersChange.emit({
      inserts: this.newProductReferences.filter((pr: ProductReference) => pr.systemId < 0),
      updates: this.newProductReferences.filter((pr: ProductReference) => pr.systemId >= 0),
      deletes: this.deletedProductReferences
    });
  }

  filterProducts(): void {
    const filterValue = this.input?.nativeElement.value.toLowerCase() as string;
    this.filteredProductsList = this.productsList.filter(
      product => product.name.toLowerCase().includes(filterValue));
  }

  displayProduct(product: Product): string {
    return product && product.name ? product.name : '';
  }

  setProduct() {

    const product = this.productSelectionControl.value?
      this.productSelectionControl.value: undefined;

    if(this.selectedProductReference) {

      this.selectedProductReference.product = product;

      // just to update selectedProductReferenceIsUpdated, returned value ignored
      this.findProductReference(this.selectedProductReference.systemId);

      if(!this.selectedProductReferenceIsUpdated) {

        this.productReferences = this.productReferences.filter(
          (productReference: ProductReference) =>
            productReference.systemId !== this.selectedProductReference?.systemId);

        this.newProductReferences.unshift(this.selectedProductReference);
        this.newProductReferences = [...this.newProductReferences];

      }

      console.log(this.annotorious.getAnnotationById(this.selectedProductReference.systemId));

      this.annotorious.getAnnotationById(this.selectedProductReference.systemId).product = product;

      this.emitChanges();
    }

  }

  initializeAnnotorious(): void {

    this.annotorious = new Annotorious({
      image: this.refImage?.nativeElement,
      handleRadius: 4,
      readOnly: !this.editable,
      formatter: this.formatAnnotation
    });

    this.annotorious.on('mouseEnterAnnotation', (annotation: any) => {

      this.hoveredProductReferenceId = annotation.id;

    });

    this.annotorious.on('mouseLeaveAnnotation', () => {

      this.hoveredProductReferenceId = null;

    });

    this.annotorious.on('clickAnnotation', (annotation: any) => {

      this.selectedProductReference = this.findProductReference(annotation.id);
      this.productSelectionControl.enable({emitEvent: false});

      this.productSelectionControl.setValue(
        this.selectedProductReference?.product? this.selectedProductReference?.product: null,
        {emitEvent: false});

    });

    this.annotorious.on('cancelSelected', () => {

      this.selectedProductReference = undefined;
      this.productSelectionControl.reset();
      this.productSelectionControl.disable({emitEvent: false});

    });

    this.annotorious.on('changeSelected', (selection: any) => {

      this.selectedProductReference = this.findProductReference(selection.id);
      this.productSelectionControl.enable({emitEvent: false});

      this.productSelectionControl.setValue(
        this.selectedProductReference?.product? this.selectedProductReference?.product: null,
        {emitEvent: false});

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

      this.newProductReferences.unshift(newProductReference);
      this.newProductReferences = [...this.newProductReferences];

      this.annotorious.addAnnotation(this.createAnnotation(newProductReference));
      this.annotorious.cancelSelected();
      this.annotorious.selectAnnotation(newProductReference.systemId);

      this.selectedProductReference = this.findProductReference(newProductReference.systemId);
      this.productSelectionControl.enable({emitEvent: false});


      this.emitChanges();

    });

    this.annotorious.on('updateAnnotation', (selection: any) => {

      const coordinates = this.getCoordinates(selection);

      const productReference = this.findProductReference(selection.id);

      if(productReference) {

        productReference.x1 = coordinates.x1;
        productReference.y1 = coordinates.y1;
        productReference.x2 = coordinates.x2;
        productReference.y2 = coordinates.y2;

        if(!this.selectedProductReferenceIsUpdated) {

          this.productReferences = this.productReferences.filter(
            (productReference: ProductReference) => productReference.systemId !== selection.id);
          this.newProductReferences.unshift(productReference);
          this.newProductReferences = [...this.newProductReferences];

        }

      }

      this.selectedProductReference = productReference;
      this.productSelectionControl.enable({emitEvent: false});

      this.emitChanges();

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

      if(productReference && productReference.systemId >= 0) {

        this.deletedProductReferences.unshift(productReference);
        this.deletedProductReferences = [...this.deletedProductReferences];

      }

      this.selectedProductReference = undefined;
      this.productSelectionControl.reset();
      this.productSelectionControl.disable({emitEvent: false});

      this.emitChanges();

    });


    this.productReferencesObservable?.subscribe((productReferences: ProductReference[]) => {
      this.productReferences = productReferences;
      for (let productReference of this.productReferences) {
        this.annotorious.addAnnotation(this.createAnnotation(productReference));
      }
    });

  }

  findProductReference(systemId: number): ProductReference | undefined {

    this.selectedProductReferenceIsUpdated = false;

    let productReference = this.productReferences.find(
      (productReference: ProductReference) => productReference.systemId === systemId);

    if(!productReference) {

      this.selectedProductReferenceIsUpdated = true;

      productReference = this.newProductReferences.find(
        (productReference: ProductReference) => productReference.systemId === systemId);

    }

    return productReference;

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
      "id": productReference.systemId,
      "product": productReference.product
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
    if(productReference.systemId === this.selectedProductReference?.systemId) {
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

  formatAnnotation(annotation: any): any {
    if(annotation.underlying.id >= 0) {
      // current
      if(annotation.underlying.product) {
        return {
          'style': 'stroke-width:2; stroke: green'
        }
      } else {
        return {
          'style': 'stroke-width:2; stroke: red'
        }
      }
    } else {
      // new
      if(annotation.underlying.product) {
        return {
          'style': 'stroke-width:2; stroke: blue'
        }
      } else {
        return {
          'style': 'stroke-width:2; stroke: yellow'
        }
      }
    }
  }

}
