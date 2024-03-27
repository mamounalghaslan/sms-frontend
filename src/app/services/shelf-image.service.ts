import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShelfImage} from "../models/ShelfImage";

@Injectable({
  providedIn: 'root'
})
export class ShelfImageService {

  private shelfImagesUrl = 'http://localhost:8080/api/shelf-images';

  constructor(private http: HttpClient) {}

  getShelfImages(): Observable<ShelfImage[]> {
    return this.http.get<ShelfImage[]>(this.shelfImagesUrl + '/allShelfImages');
  }

}
