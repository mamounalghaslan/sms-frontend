import { Injectable } from '@angular/core';
import {Employee} from "../models/Employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor() { }

  getEmployees(): Employee[] {
    return [
      {systemId: 1, name: 'employee 1', mobile: '0512345678'},
      {systemId: 2, name: 'employee 2', mobile: '0512345678'},
      {systemId: 3, name: 'employee 3', mobile: '0512345678'},
      {systemId: 4, name: 'employee 4', mobile: '0512345678'}
    ];
  }

}
