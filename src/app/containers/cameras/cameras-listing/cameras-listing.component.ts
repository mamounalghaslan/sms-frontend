import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Camera} from "../../../models/Camera";
import {CamerasService} from "../../../services/cameras.service";
import {Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../../../shared/confirmation-dialog/confirmation-dialog.component";

// regex for ip address with port
const ipAddressWithPortPattern = '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):((6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[1-9][0-9]{1,3}|[1-9])|0)$';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras-listing.component.html'
})
export class CamerasListingComponent implements OnInit {

  displayedColumns: string[] = ['systemId', 'cameraStatusType', 'ipAddress', 'location', 'userpass', 'actions'];
  cameras: Camera[] = [];

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
              private service: CamerasService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAllCameras();
  }

  private getAllCameras(): void {
    this.service.getAllCameras().subscribe((cameras: Camera[]) => {
      this.cameras = cameras;
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
      systemId: null,
      cameraStatusType: {systemId: 1, description: 'OFFLINE'},
      ipAddress: this.newCameraForm.value.ipAddress,
      location: this.newCameraForm.value.location,
      username: this.newCameraForm.value.username,
      password: this.newCameraForm.value.password
    };
    this.service.addNewCamera(newCamera).subscribe(() => {
      this.newCameraTemplateRef?.close();
      this.getAllCameras();
    });
  }

  deleteCamera(camera: Camera) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {message: 'Are you sure you want to delete Camera ' + camera.systemId + '?'}
    }).afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteCamera(camera).subscribe(() => {
          this.getAllCameras();
        });
      }
    });
  }

  openConsole(camera: Camera) {
    this.router.navigate(['cameras/console/', camera.systemId]);
  }

  initializeCameras() {
    this.service.initializeProducts().subscribe(() => {
      this.getAllCameras();
    });
  }

}
