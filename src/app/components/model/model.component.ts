import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ModelService} from "../../services/model.service";
import {Model} from "../../models/Model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModelType} from "../../models/ModelType";
import {ConfirmationDialogComponent} from "../../shared/confirmation-dialog/confirmation-dialog.component";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-model-management',
  templateUrl: './model.component.html'
})
export class ModelComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['systemId', 'type', 'creationDate', 'actions'];

  private jobStatusSubscription: Subscription | undefined;

  models: Model[] = [];
  modelTypes: ModelType[] = [];

  isInferenceJobRunning: boolean = true;
  isTrainingJobRunning: boolean = true;

  public newModelForm: FormGroup = this.fb.group({
    modelType: [null, Validators.required]
  });

  @ViewChild('newModelTemplate', {static: false})
  public newModelTemplate: TemplateRef<any> | undefined;
  public newModelTemplateRef: MatDialogRef<any> | undefined;

  constructor(private service: ModelService,
              private dialog: MatDialog,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.queryModelsInfo();
    this.jobStatusSubscription = interval(5000).subscribe(() => {
      this.queryModelsInfo();
    });
    this.service.getModelTypes().subscribe((modelTypes: ModelType[]) => {
      this.modelTypes = modelTypes;
    });
  }

  ngOnDestroy() {
    this.jobStatusSubscription?.unsubscribe();
  }

  queryModelsInfo() {
    this.service.getInferenceJobStatus().subscribe((status: string) => {
      this.isInferenceJobRunning = status === 'true';
    });
    this.service.getTrainingJobStatus().subscribe((status: string) => {
      this.isTrainingJobRunning = status === 'true';
    });
    this.service.getModels().subscribe((models: Model[]) => {
      this.models = models;
    });
  }

  public openNewModelTemplate() {
    this.newModelForm.reset();
    this.newModelTemplateRef = this.dialog.open(this.newModelTemplate!,{
      width: 'auto',
      height: 'auto'
    });
  }

  startInferenceJob(model: Model) {
    this.service.startInferenceJob(model).subscribe((info: string) => {
      console.log(info);
      this.queryModelsInfo();
    });
  }

  stopInferenceJob() {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {message: 'Are you sure you want to stop the inference job?'}
    }).afterClosed().subscribe(result => {
      if (result) {
        this.service.stopInferenceJob().subscribe((info: string) => {
          this.queryModelsInfo();
          console.log(info);
        });
      }
    });
  }

  startTrainingJob() {
    if(this.newModelForm.valid) {
      this.service.startTrainingJob(this.newModelForm.value.modelType).subscribe((info: string) => {
        this.dialog.closeAll();
        this.queryModelsInfo();
        console.log(info);
      });
    }
  }

  stopTrainingJob() {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {message: 'Are you sure you want to stop the training job?'}
    }).afterClosed().subscribe(result => {
      if (result) {
        this.service.stopTrainingJob().subscribe((info: string) => {
          this.queryModelsInfo();
          console.log(info);
        });
      }
    });
  }

  initialize() {
    this.service.initialize().subscribe(() => {
      this.queryModelsInfo();
    });
  }

  deleteModel(model: Model) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {message: 'Are you sure you want to delete model ' + model.systemId + '?'}
    }).afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteModel(model.systemId).subscribe(() => {
          this.queryModelsInfo();
        });
      }
    });
  }

}
