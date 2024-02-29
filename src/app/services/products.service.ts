import { Injectable } from '@angular/core';
import {Product} from "../models/Product";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl + '/allProducts');
  }

  saveNewProduct(product: Product, images: File[]): Observable<null> {
    const formData = new FormData();
    formData.append('product', JSON.stringify(product));
    images.forEach((image: File) => {
      formData.append('images', image);
    });
    return this.http.post<null>(this.productsUrl + '/addNewProduct', formData);
  }

}
