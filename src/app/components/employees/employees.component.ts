import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EmployeesService} from "../../services/employees.service";
import {Employee} from "../../models/Employee";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'mobile', 'actions'];
  dataSource: Employee[] = [];

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
              private dialog: MatDialog,
              private service: EmployeesService) {
  }

  ngOnInit() {
    this.dataSource = this.service.getEmployees();
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
