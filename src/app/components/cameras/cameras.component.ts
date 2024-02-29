import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Camera} from "../../models/Camera";
import {CamerasService} from "../../services/cameras.service";
import {CameraStatusType} from "../../models/CameraStatusType";

// regex for ip address with port
const ipAddressWithPortPattern = '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):((6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[1-9][0-9]{1,3}|[1-9])|0)$';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html'
})
export class CamerasComponent implements OnInit {

  displayedColumns: string[] = ['systemId', 'cameraStatusType', 'ipAddress', 'location', 'userpass', 'actions'];
  dataSource: Camera[] = [];
  statusTypes: CameraStatusType[] = [];

  public newCameraForm: FormGroup = this.fb.group({
    ipAddress: ['', [Validators.required, Validators.pattern(ipAddressWithPortPattern)]],
    location: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  @ViewChild('newCameraTemplate', {static: false})
  public newCameraTemplate: TemplateRef<any> | undefined;
  public newCameraTemplateRef: MatDialogRef<any> | undefined;

  @ViewChild('referenceImageTemplate', {static: false})
  public referenceImageTemplate: TemplateRef<any> | undefined;
  public referenceImageTemplateRef: MatDialogRef<any> | undefined;

  selectedCamera: Camera | undefined;
  referenceImage: File | undefined;
  referenceImageFile: File | undefined;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private service: CamerasService) {
  }

  ngOnInit() {
    this.getAllCameras();
    this.service.getStatusTypes().subscribe((statusTypes: CameraStatusType[]) => {
      this.statusTypes = statusTypes;
    });
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
      systemId: null,
      cameraStatusType: this.statusTypes.find(cameraStatusType=>cameraStatusType.systemId==1),
      ipAddress: this.newCameraForm.value.ipAddress,
      location: this.newCameraForm.value.location,
      username: this.newCameraForm.value.username,
      password: this.newCameraForm.value.password,
      referenceImagePath: null,
      referenceImageFileBase64: null,
      referenceImageCaptureDate: new Date()
    };
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

  openManageReferenceImage(camera: Camera) {
    this.referenceImageFile = undefined;
    this.referenceImage = undefined;
    this.selectedCamera = camera;
    this.referenceImageTemplateRef = this.dialog.open(this.referenceImageTemplate!,{
      width: 'auto',
      height: 'auto'
    });
  }

  saveReferenceImage() {
    if(this.selectedCamera && this.selectedCamera.systemId && this.referenceImageFile) {
      this.service.updateCameraReferenceImage(this.selectedCamera.systemId, this.referenceImageFile)
        .subscribe(() => {
        this.referenceImageTemplateRef?.close();
        this.selectedCamera = undefined;
        this.getAllCameras();
      });
    }
  }

  onFileSelected(event: any) {
    this.referenceImageFile = undefined;
    this.referenceImage = undefined;

    if (event.target.files && event.target.files[0]) {
      const files = event.target.files;

      for (let file of files) {

        this.referenceImageFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.referenceImage = e.target.result;
        };

        reader.readAsDataURL(file);
      }
    }
  }

}
