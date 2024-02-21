import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Camera} from "../../models/Camera";
import {CamerasService} from "../../services/cameras.service";

const ipAddressPattern = '^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html'
})
export class CamerasComponent implements OnInit {

  displayedColumns: string[] = ['name', 'status', 'ipAddress', 'port', 'section', 'shelf', 'actions'];
  dataSource: Camera[] = [];

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
              private dialog: MatDialog,
              private service: CamerasService) {
  }

  ngOnInit() {
    this.dataSource = this.service.getCameras();
  }

  public openNewCameraTemplate() {
    this.newCameraTemplateRef = this.dialog.open(this.newCameraTemplate!,{
      width: 'auto',
      height: 'auto'
    });
  }

  saveNewCamera() {

  }
}
