import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Product} from "../../models/Product";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {ProductImage} from "../../models/ProductImage";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'images', 'actions'];
  dataSource: Product[] = [];

  imagesDisplayed: string[] = [];
  imagesFiles: File[] = [];

  productsImages: ProductImage[] = [];

  public productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    images: [[], Validators.required]
  });

  @ViewChild('newProductTemplate', {static: false})
  public newProductTemplate: TemplateRef<any> | undefined;
  public newProductTemplateRef: MatDialogRef<any> | undefined;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private service: ProductsService) {
  }

  ngOnInit() {
    this.getAllProducts();
  }

  private getAllProducts(): void {
    this.service.getProducts().subscribe((products: Product[]) => {
      this.dataSource = products;
    });
    this.service.getProductsImages().subscribe((productsImages: ProductImage[]) => {
      this.productsImages = productsImages;
    });
  }

  saveProduct() {
    if (this.productForm.valid) {
      const product: Product = {
        systemId: null,
        name: this.productForm.value.name
      };

      this.service.addNewProduct(product).subscribe((newProduct: Product)=> {
        this.service.addProductImages(newProduct.systemId!, this.imagesFiles).subscribe(() => {
          this.getAllProducts();
        })
      });
      this.newProductTemplateRef?.close();
    }
  }

  openAddNewProductTemplate() {
    this.productForm.reset();
    this.imagesDisplayed = [];
    this.imagesFiles = [];

    this.newProductTemplateRef = this.dialog.open(this.newProductTemplate!, {
      width: 'auto',
      height: 'auto'
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const files = event.target.files;

      for (let file of files) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.imagesDisplayed.push(e.target.result);
        };

        reader.readAsDataURL(file);
        this.imagesFiles.push(file);
      }
      this.productForm.patchValue({images: this.imagesFiles});
    }
  }

  removeImage(index: number) {
    this.imagesDisplayed.splice(index, 1);
    this.imagesFiles.splice(index, 1);
  }

  filterProductImages(productId: number): ProductImage[] {
    return this.productsImages.filter((productImage: ProductImage) =>
      productImage.product.systemId === productId);
  }

  deleteProduct(productId: number) {
    this.service.deleteProduct(productId).subscribe(() => {
      this.getAllProducts();
    });
  }
}
