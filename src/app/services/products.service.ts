import { Injectable } from '@angular/core';
import {Product} from "../models/Product";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SnackbarMessage} from "../snackbar/snackbar-decorator";
import {ImagesService} from "./ImagesService";

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ImagesService {

  private productsUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {
    super();
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl + '/allProducts');
  }

  addNewProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl + '/addNewProduct', product);
  }

  @SnackbarMessage(
    'Product successfully added.',
    'Error adding product.')
  addProductDisplayImage(productId: number, imageFile: File): Observable<null> {
    const headers = new HttpHeaders({ 'X-Use-Snackbar': 'true' });
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    return this.http.post<null>(
      this.productsUrl + '/' + productId + '/addProductDisplayImage', formData, { headers });
  }

  @SnackbarMessage(
    'Product successfully deleted.',
    'Error deleting product.')
  deleteProduct(product: Product): Observable<null> {
    const headers = new HttpHeaders({ 'X-Use-Snackbar': 'true' });
    return this.http.delete<null>(this.productsUrl + '/deleteProduct', {body: product, headers: headers});
  }

}
