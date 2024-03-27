import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Camera} from "../../../models/Camera";
import {CamerasService} from "../../../services/cameras.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ShelfImage} from "../../../models/ShelfImage";

const ipAddressWithPortPattern = '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):((6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[1-9][0-9]{1,3}|[1-9])|0)$';

@Component({
  selector: 'app-camera-console',
  templateUrl: './camera-console.component.html'
})
export class CameraConsoleComponent implements OnInit {

  camera: Camera | undefined;
  cameraShelfImage: ShelfImage | undefined;

  newShelfImage: File | undefined;

  public cameraForm: FormGroup = this.fb.group({
    ipAddress: ['', [Validators.required, Validators.pattern(ipAddressWithPortPattern)]],
    location: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  public newShelfImageForm: FormGroup = this.fb.group({
    isReferenced: [false, Validators.required],
    image: [undefined, Validators.required]
  });

  @ViewChild('captureNewImageTemplate', {static: false})
  public captureNewImageTemplate: TemplateRef<any> | undefined;
  public captureNewImageTemplateRef: MatDialogRef<any> | undefined;

  constructor(private route: ActivatedRoute,
              private service: CamerasService,
              private fb: FormBuilder,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.getCamera(this.route.snapshot.params['cameraId']).subscribe((camera: Camera) => {
      this.camera = camera;
      this.cameraForm.patchValue(camera);
      this.service.getCameraReferenceImage(this.camera.systemId!).subscribe((image: ShelfImage) => {
        this.cameraShelfImage = image;
      });
    });
  }

  public getCameraStatusStyle(camera: Camera | undefined): string {
    if (camera?.cameraStatusType?.systemId === 1) {
      return 'color: red';
    }
    else  {
      return 'color: green';
    }
  }

  public openCaptureNewImageTemplate() {
    this.newShelfImageForm.reset();
    this.newShelfImageForm.patchValue({isReferenced: false});
    this.newShelfImage = undefined;

    this.captureNewImageTemplateRef = this.dialog.open(this.captureNewImageTemplate!,{
      width: 'auto',
      height: 'auto'
    });
  }

  onFileSelected(event: any) {
    this.newShelfImage = undefined;
    this.newShelfImageForm.patchValue({image: undefined});

    if (event.target.files && event.target.files[0]) {
      const files = event.target.files;

      for (let file of files) {

        this.newShelfImageForm.patchValue({image: file});

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.newShelfImage = e.target.result;
        };

        reader.readAsDataURL(file);
      }
    }
  }

  submitNewImage() {
    if(this.newShelfImageForm.valid) {
      const newShelfImage: ShelfImage = {
        systemId: null,
        captureDate: new Date(),
        referencedCamera: this.newShelfImageForm.value.isReferenced? this.camera! : undefined,
        imagePath: null,
        imageFileBase64: null
      };

      this.service.addNewShelfImage(newShelfImage).subscribe(
        (newShelfImage: ShelfImage) => {
        this.service.addShelfImageFile(newShelfImage.systemId!, this.newShelfImageForm.value.image).subscribe(
          () => {
          this.service.getCameraReferenceImage(this.camera!.systemId!).subscribe(
            (image: ShelfImage) => {
            this.cameraShelfImage = image;
          });
        });
      });

      this.captureNewImageTemplateRef?.close();
    }
  }

}