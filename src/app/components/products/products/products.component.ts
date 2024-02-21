import {Component, TemplateRef, ViewChild} from '@angular/core';
import {Product} from "../../../models/Product";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

const ELEMENT_DATA: Product[] = [
  {name: 'product name 1', shelf: '12', section: 'A', images: []},
  {name: 'product name 2', shelf: '15', section: 'B', images: []},
  {name: 'product name 3', shelf: '7', section: 'C', images: []},
  {name: 'product name 4', shelf: '12', section: 'D', images: []}
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {

  displayedColumns: string[] = ['name', 'shelf', 'section', 'actions'];
  dataSource = ELEMENT_DATA;

  public selectedProduct: Product | undefined;

  public productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    shelf: ['', Validators.required],
    section: ['', Validators.required],
    images: [([])]
  });

  @ViewChild('manageProductTemplate', {static: false})
  public manageProductTemplate: TemplateRef<any> | undefined;
  public manageProductTemplateRef: MatDialogRef<any> | undefined;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog) {
  }

  saveProduct() {

  }

  openAddNewProductTemplate() {
    this.manageProductTemplateRef = this.dialog.open(this.manageProductTemplate!, {
      width: 'auto',
      height: 'auto'
    });
  }
}
