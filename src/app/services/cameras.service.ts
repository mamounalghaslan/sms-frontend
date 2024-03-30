import { Injectable } from '@angular/core';
import {Camera} from "../models/Camera";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SnackbarMessage} from "../snackbar/snackbar-decorator";
import {ShelfImage} from "../models/ShelfImage";

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

  getCameraReferenceImage(cameraId: number): Observable<ShelfImage> {
    return this.http.get<ShelfImage>(this.camerasUrl + '/getCameraReferenceImage/' + cameraId);
  }

  @SnackbarMessage(
    'Camera added successfully.',
    'Error adding camera.')
  addNewCamera(camera: Camera): Observable<null> {
    const headers = new HttpHeaders({ 'X-Use-Snackbar': 'true' });
    return this.http.post<null>(this.camerasUrl + '/addNewCamera', camera, { headers });
  }

  @SnackbarMessage(
    'Camera deleted successfully.',
    'Error deleting camera.')
  deleteCamera(camera: Camera): Observable<null> {
    const headers = new HttpHeaders({ 'X-Use-Snackbar': 'true' });
    return this.http.delete<null>(this.camerasUrl + '/deleteCamera', {body: camera, headers: headers });
  }

  addNewShelfImage(shelfImage: ShelfImage): Observable<ShelfImage> {
    return this.http.post<ShelfImage>(this.camerasUrl + '/addNewShelfImage', shelfImage);
  }

  @SnackbarMessage(
    'New Shelf Image added successfully.',
    'Error adding new Shelf Image.')
  addShelfImageFile(shelfImageId: number, imageFile: File): Observable<null> {
    const headers = new HttpHeaders({ 'X-Use-Snackbar': 'true' });
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    return this.http.post<null>(
      this.camerasUrl + '/addShelfImageFile/' + shelfImageId, formData, { headers });
  }
}
