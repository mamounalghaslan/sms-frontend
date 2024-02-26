import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Camera} from "../../models/Camera";
import {CamerasService} from "../../services/cameras.service";

// regex for ip address with port
const ipAddressWithPortPattern = '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):((6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[1-9][0-9]{1,3}|[1-9])|0)$';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html'
})
export class CamerasComponent implements OnInit {

  displayedColumns: string[] = ['systemId', 'cameraStatusType', 'ipAddress', 'location', 'userpass', 'actions'];
  dataSource: Camera[] = [];

  public newCameraForm: FormGroup = this.fb.group({
    ipAddress: ['', [Validators.required, Validators.pattern(ipAddressWithPortPattern)]],
    location: ['', Validators.required],
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
    this.getAllCameras();
  }

  private getAllCameras(): void {
    this.service.getCameras().subscribe((cameras: Camera[]) => {
      this.dataSource = cameras;
    });
  }

  public openNewCameraTemplate() {
    this.newCameraForm.reset();
    this.newCameraTemplateRef = this.dialog.open(this.newCameraTemplate!,{
      width: 'auto',
      height: 'auto'
    });
  }

  addNewCamera() {
    const newCamera: Camera = {
      ...this.newCameraForm.value,
      systemId: null,
      cameraStatusType: null,
      cameraReferenceImage: null
    }
    this.service.addCamera(newCamera).subscribe(() => {
      this.newCameraTemplateRef?.close();
      this.getAllCameras();
    });
  }

  deleteCamera(systemId: number) {
    this.service.deleteCamera(systemId).subscribe(() => {
      this.getAllCameras();
    });
  }
}
