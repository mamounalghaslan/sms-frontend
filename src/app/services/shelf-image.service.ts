import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShelfImage} from "../models/ShelfImage";
import {ProductReference} from "../models/ProductReference";
import {ImagesService} from "./ImagesService";

@Injectable({
  providedIn: 'root'
})
export class ShelfImageService extends ImagesService {

  private shelfImagesUrl = 'http://localhost:8080/api/shelf-images';

  constructor(private http: HttpClient) {
    super();
  }

  getAllShelfImages(): Observable<ShelfImage[]> {
    return this.http.get<ShelfImage[]>(this.shelfImagesUrl + '/allShelfImages');
  }

  getProductReferencesByShelfImage(shelfImageId: number): Observable<ProductReference[]> {
    return this.http.get<ProductReference[]>(this.shelfImagesUrl + '/productReferences/' + shelfImageId);
  }

  getShelfImage(shelfImageId: number): Observable<ShelfImage> {
    return this.http.get<ShelfImage>(this.shelfImagesUrl + '/' + shelfImageId);
  }

}
