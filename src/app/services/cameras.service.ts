import { Injectable } from '@angular/core';
import {Camera} from "../models/Camera";

@Injectable({
  providedIn: 'root'
})
export class CamerasService {

  constructor() { }

  getCameras(): Camera[] {
    return [
      {systemId: 1, name: 'camera 1', ipAddress: '103.12.31.1', port: 2233, section: 'A', shelf: '1', status: 'OK', username: '', password: ''},
      {systemId: 2, name: 'camera 2', ipAddress: '103.12.31.2', port: 2233, section: 'B', shelf: '1', status: 'OK', username: '', password: ''},
      {systemId: 3, name: 'camera 3', ipAddress: '103.12.31.3', port: 2233, section: 'A', shelf: '2', status: 'DISCONNECTED', username: '', password: ''},
      {systemId: 4, name: 'camera 4', ipAddress: '103.12.31.4', port: 2233, section: 'B', shelf: '2', status: 'OK', username: '', password: ''}
    ];
  }

}
