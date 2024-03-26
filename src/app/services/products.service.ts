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

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl + '/allProducts');
  }

  addNewProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl + '/addNewProduct', product);
  }

  addProductDisplayImage(productId: number, imageFile: File): Observable<null> {
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    return this.http.post<null>(this.productsUrl + '/' + productId + '/addProductDisplayImage', formData);
  }

  deleteProduct(product: Product): Observable<null> {
    return this.http.delete<null>(this.productsUrl + '/deleteProduct', {body: product});
  }

}
