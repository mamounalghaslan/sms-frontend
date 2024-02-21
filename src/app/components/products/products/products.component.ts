import { Component } from '@angular/core';
import {Product} from "../../../models/Product";

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

}
