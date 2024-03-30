import {ShelfImage} from "../../models/ShelfImage";
import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
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

  // TODO: Get the image dimenstions from the backend

  displayedColumns: string[] = ['product', 'x1', 'y1', 'x2', 'y2'];
  productReferences: ProductReference[] = [];

  @Input()
  shelfImage: ShelfImage | undefined;

  @Input()
  editable: boolean = false;

  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement> | undefined;

  canvasContext: CanvasRenderingContext2D | null | undefined;

  imageWidth: number = 640;
  imageHeight: number = 640;

  constructor(public service: ShelfImageService) {
  }

  ngOnInit() {
    this.service.getProductReferencesByShelfImage(this.shelfImage?.systemId!)
      .subscribe((productReferences: ProductReference[]) => {
        this.productReferences = productReferences;
        this.drawRectangles();
      });
  }

  private drawRectangles() {
    this.canvasContext = this.canvas?.nativeElement.getContext('2d');
    this.productReferences.forEach(pr => {
      if(this.canvasContext) {
        this.canvasContext.beginPath();
        this.canvasContext.strokeStyle = 'red';
        this.canvasContext.lineWidth = 2;
        this.canvasContext.rect(pr.x1, pr.y1, pr.x2 - pr.x1, pr.y2 - pr.y1);
        this.canvasContext.stroke();
      }
    });
  }

}
