import {ShelfImage} from "../../models/ShelfImage";
import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
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
        this.drawCanvas();
      });
  }

  private drawCanvas() {
    const img = new Image();
    img.onload = () => {
      if (this.canvas) {
        this.canvasContext = this.canvas.nativeElement.getContext('2d');
        this.imageWidth = img.width;
        this.imageHeight = img.height;
        this.drawRectangles();
      }
    };
    img.src = this.service.getImageLink('shelfImages', this.shelfImage?.systemId!, this.shelfImage?.imageFileName!);
  }

  private drawRectangles() {
    this.productReferences.forEach(pr => {
      if(this.canvasContext) {
        this.canvasContext.beginPath();
        this.canvasContext.strokeStyle = 'red';
        this.canvasContext.lineWidth = 5;
        this.canvasContext.rect(pr.x1, pr.y1, pr.x2 - pr.x1, pr.y2 - pr.y1);
        this.canvasContext.stroke();
      }
    });
  }

}
