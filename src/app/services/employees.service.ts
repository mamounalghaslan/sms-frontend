import { Injectable } from '@angular/core';
import {Employee} from "../models/Employee";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private employeesUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl + '/allEmployees');
  }

  addNewEmployee(employee: Employee): Observable<null> {
    return this.http.post<null>(this.employeesUrl + '/addNewEmployee', employee);
  }

  deleteEmployee(employee: Employee): Observable<null> {
    return this.http.delete<null>(this.employeesUrl + '/deleteEmployee', {body: employee});
  }

}
