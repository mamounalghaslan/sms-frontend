import { Injectable } from '@angular/core';
import {Camera} from "../models/Camera";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CamerasService {

  private camerasUrl = 'https://localhost:8080/api/cameras';

  constructor(private http: HttpClient) {

  }

  getCameras(): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.camerasUrl + '/allCameras');
  }

}
