import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html'
})
export class CamerasComponent implements OnInit {

  private ipAddressPattern = '^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$';

  public newCameraForm: FormGroup = this.fb.group({
    ipAddress: ['', [Validators.required, Validators.pattern(this.ipAddressPattern)]],
    port: ['', [Validators.required, Validators.min(0), Validators.max(65535)]],
    status: ['', Validators.required],
    shelf: ['', Validators.required],
    section: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  @ViewChild('newCameraTemplate', {static: false})
  public newCameraTemplate: TemplateRef<any> | undefined;
  public newCameraTemplateRef: MatDialogRef<any> | undefined;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  public openNewCameraTemplate() {
    this.newCameraTemplateRef = this.dialog.open(this.newCameraTemplate!);
  }

}
