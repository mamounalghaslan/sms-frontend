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

  displayedColumns: string[] = ['name', 'shelf', 'section', 'actions'];
  dataSource: Product[] = [];

  images: string[] = [];

  public productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    shelf: ['', Validators.required],
    section: ['', Validators.required],
    images: [([])]
  });

  @ViewChild('newProductTemplate', {static: false})
  public newProductTemplate: TemplateRef<any> | undefined;
  public newProductTemplateRef: MatDialogRef<any> | undefined;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private service: ProductsService) {
  }

  ngOnInit() {
    this.dataSource = this.service.getProducts();
  }

  saveProduct() {

  }

  openAddNewProductTemplate() {
    this.productForm.reset();
    this.images = [];
    this.newProductTemplateRef = this.dialog.open(this.newProductTemplate!, {
      width: 'auto',
      height: 'auto'
    });
  }

  onFileSelected(event: any) {
    this.images = [];
    if (event.target.files && event.target.files[0]) {
      const files = event.target.files;

      for (let file of files) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.images.push(e.target.result);
        };

        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1); // Remove the image at the specified index
  }

}
