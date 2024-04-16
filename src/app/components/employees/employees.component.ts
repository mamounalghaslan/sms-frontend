import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EmployeesService} from "../../services/employees.service";
import {Employee} from "../../models/Employee";
import {ConfirmationDialogComponent} from "../../shared/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'mobile', 'actions'];
  employeesList: Employee[] = [];

  public newEmployeeForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    mobile: ['', Validators.required]
  });

  @ViewChild('newEmployeeTemplate', {static: false})
  public newEmployeeTemplate: TemplateRef<any> | undefined;
  public newEmployeeTemplateRef: MatDialogRef<any> | undefined;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private service: EmployeesService) {
  }

  ngOnInit() {
    this.service.getEmployees().subscribe(employees => {
      this.employeesList = employees;
    });
  }

  openAddNewEmployeeTemplate() {
    this.newEmployeeTemplateRef = this.dialog.open(this.newEmployeeTemplate!, {
      width: 'auto',
      height: 'auto'
    });
  }

  saveNewEmployee() {
    if (this.newEmployeeForm.valid) {
      this.service.addNewEmployee(this.newEmployeeForm.value as Employee).subscribe(() => {
        this.service.getEmployees().subscribe(employees => {
          this.employeesList = employees;
          this.newEmployeeForm.reset();
          this.newEmployeeTemplateRef?.close();
        });
      });
    }
  }

  deleteEmployee(employee: Employee) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {message: 'Are you sure you want to delete "' + employee.name + '"?'}
    }).afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteEmployee(employee).subscribe(() => {
          this.service.getEmployees().subscribe(employees => {
            this.employeesList = employees;
          });
        });
      }
    });
  }

}
