import { Injectable } from '@angular/core';
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProducts(): Product[] {
    return [
      {systemId: 1, name: 'product name 1', shelf: '12', section: 'A', images: []},
      {systemId: 2, name: 'product name 2', shelf: '15', section: 'B', images: []},
      {systemId: 3, name: 'product name 3', shelf: '7', section: 'C', images: []},
      {systemId: 4, name: 'product name 4', shelf: '12', section: 'D', images: []}
    ];
  }

}
