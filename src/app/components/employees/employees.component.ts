import {Component, TemplateRef, ViewChild} from '@angular/core';
import {Employee} from "../../models/Employee";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

const ELEMENT_DATA: Employee[] = [
  {name: 'employee 1', mobile: '0512345678'},
  {name: 'employee 2', mobile: '0512345678'},
  {name: 'employee 3', mobile: '0512345678'},
  {name: 'employee 4', mobile: '0512345678'}
];

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent {

  displayedColumns: string[] = ['name', 'mobile', 'actions'];
  dataSource = ELEMENT_DATA;

  public newEmployeeForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    shelf: ['', Validators.required],
    section: ['', Validators.required],
    images: [([])]
  });

  @ViewChild('newEmployeeTemplate', {static: false})
  public newEmployeeTemplate: TemplateRef<any> | undefined;
  public newEmployeeTemplateRef: MatDialogRef<any> | undefined;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog) {
  }

  openAddNewEmployeeTemplate() {
    this.newEmployeeTemplateRef = this.dialog.open(this.newEmployeeTemplate!, {
      width: 'auto',
      height: 'auto'
    });
  }

  saveNewEmployee() {

  }
}
