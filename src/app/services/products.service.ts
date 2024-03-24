import { Injectable } from '@angular/core';
import {Product} from "../models/Product";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProductImage} from "../models/ProductImage";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl + '/allProducts');
  }

  getProductsImages(): Observable<ProductImage[]> {
    return this.http.get<ProductImage[]>(this.productsUrl + '/allProductsImages');
  }

  addNewProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl + '/addNewProduct', product);
  }

  addProductImages(productId: number, images: File[]): Observable<null> {
    const formData = new FormData();
    images.forEach((image: File) => {
      formData.append('imagesFiles', image);
    });
    return this.http.post<null>(this.productsUrl + '/' + productId + '/addProductImages', formData);
  }

  deleteProduct(productId: number): Observable<null> {
    return this.http.delete<null>(this.productsUrl + '/' + productId);
  }

}
