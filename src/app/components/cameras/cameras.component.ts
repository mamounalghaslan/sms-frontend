import {Component, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Camera} from "../../models/Camera";

const ELEMENT_DATA: Camera[] = [
  {name: 'camera 1', ipAddress: '103.12.31.1', port: 2233, section: 'A', shelf: '1', status: 'OK', username: '', password: ''},
  {name: 'camera 2', ipAddress: '103.12.31.2', port: 2233, section: 'B', shelf: '1', status: 'OK', username: '', password: ''},
  {name: 'camera 3', ipAddress: '103.12.31.3', port: 2233, section: 'A', shelf: '2', status: 'DISCONNECTED', username: '', password: ''},
  {name: 'camera 4', ipAddress: '103.12.31.4', port: 2233, section: 'B', shelf: '2', status: 'OK', username: '', password: ''}
];

const ipAddressPattern = '^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html'
})
export class CamerasComponent {

  displayedColumns: string[] = ['name', 'status', 'ipAddress', 'port', 'section', 'shelf', 'actions'];
  dataSource = ELEMENT_DATA;

  public newCameraForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    ipAddress: ['', [Validators.required, Validators.pattern(ipAddressPattern)]],
    port: ['', [Validators.required, Validators.min(0), Validators.max(65535)]],
    status: [''],
    shelf: ['', Validators.required],
    section: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  @ViewChild('newCameraTemplate', {static: false})
  public newCameraTemplate: TemplateRef<any> | undefined;
  public newCameraTemplateRef: MatDialogRef<any> | undefined;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog) {}

  public openNewCameraTemplate() {
    this.newCameraTemplateRef = this.dialog.open(this.newCameraTemplate!,{
      width: 'auto',
      height: 'auto'
    });
  }

}
