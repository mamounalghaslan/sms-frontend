import { Injectable } from '@angular/core';
import {Camera} from "../models/Camera";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CameraStatusType} from "../models/CameraStatusType";

@Injectable({
  providedIn: 'root'
})
export class CamerasService {

  private camerasUrl = 'http://localhost:8080/api/cameras';

  constructor(private http: HttpClient) {
  }

  getCameras(): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.camerasUrl + '/allCameras');
  }

  addCamera(camera: Camera): Observable<null> {
    return this.http.post<null>(this.camerasUrl + '/addNewCamera', camera);
  }

  deleteCamera(systemId: number): Observable<null> {
    return this.http.delete<null>(this.camerasUrl + '/' + systemId);
  }

  getStatusTypes(): Observable<CameraStatusType[]> {
    return this.http.get<CameraStatusType[]>(this.camerasUrl + '/allCameraStatusTypes');
  }

  updateCameraReferenceImage(cameraId: number, referenceImage: File): Observable<null> {
    const formData = new FormData();
    formData.append('imageFile', referenceImage);
    return this.http.post<null>(this.camerasUrl + '/updateCameraReferenceImage/' + cameraId, formData, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

}
