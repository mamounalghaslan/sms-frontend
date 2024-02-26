import { Injectable } from '@angular/core';
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProducts(): Product[] {
    return [
      {systemId: 1, name: 'product name 1', location: 'A12', productImages: []},
      {systemId: 2, name: 'product name 2', location: 'B15', productImages: []},
      {systemId: 3, name: 'product name 3', location: 'C7', productImages: []},
      {systemId: 4, name: 'product name 4', location: 'DA12', productImages: []}
    ];
  }

}
