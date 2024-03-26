import { Injectable } from '@angular/core';
import {Camera} from "../models/Camera";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CamerasService {

  private camerasUrl = 'http://localhost:8080/api/cameras';

  constructor(private http: HttpClient) {
  }

  getAllCameras(): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.camerasUrl + '/allCameras');
  }

  getCamera(systemId: number): Observable<Camera> {
    return this.http.get<Camera>(this.camerasUrl + '/' + systemId);
  }

  addNewCamera(camera: Camera): Observable<null> {
    return this.http.post<null>(this.camerasUrl + '/addNewCamera', camera);
  }

  deleteCamera(cameraId: number): Observable<null> {
    return this.http.delete<null>(this.camerasUrl + '/' + cameraId);
  }

}
