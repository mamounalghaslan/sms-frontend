import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Product} from "../../models/Product";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  newProductDisplayImage: File | undefined;

  public productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    image: [undefined, Validators.required]
  });

  @ViewChild('newProductTemplate', {static: false})
  public newProductTemplate: TemplateRef<any> | undefined;
  public newProductTemplateRef: MatDialogRef<any> | undefined;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              public service: ProductsService) {
  }

  ngOnInit() {
    this.getAllProducts();
  }

  private getAllProducts(): void {
    this.service.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = products.slice();
    });
  }

  filterProducts(event: any) {
    const filterValue = event.target.value.toLowerCase();

    this.filteredProducts = this.products.filter(product => {
      return product.name.toLowerCase().includes(filterValue);
    });
  }

  saveProduct() {
    if (this.productForm.valid) {
      const product: Product = {
        systemId: null,
        name: this.productForm.value.name,
        imageFileName: null
      };

      this.service.addNewProduct(product).subscribe((newProduct: Product)=> {
        this.service.addProductDisplayImage(newProduct.systemId!, this.productForm.value.image).subscribe(() => {
          this.getAllProducts();
        })
      });
      this.newProductTemplateRef?.close();
    }
  }

  openAddNewProductTemplate() {
    this.productForm.reset();
    this.newProductDisplayImage = undefined;

    this.newProductTemplateRef = this.dialog.open(this.newProductTemplate!, {
      width: 'auto',
      height: 'auto'
    });
  }

  onFileSelected(event: any) {
    this.newProductDisplayImage = undefined;
    this.productForm.patchValue({image: undefined});

    if (event.target.files && event.target.files[0]) {
      const files = event.target.files;

      for (let file of files) {

        this.productForm.patchValue({image: file});

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.newProductDisplayImage = e.target.result;
        };

        reader.readAsDataURL(file);
      }
    }
  }

  deleteProduct(product: Product) {
    this.service.deleteProduct(product).subscribe(() => {
      this.getAllProducts();
    });
  }
}
