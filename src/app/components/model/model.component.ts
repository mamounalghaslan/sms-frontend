import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ModelService} from "../../services/model.service";
import {Model} from "../../models/Model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-model-management',
  templateUrl: './model.component.html'
})
export class ModelComponent implements OnInit {

  displayedColumns: string[] = ['name', 'type', 'creationDate', 'numberOfProducts', 'actions'];

  currentModel: Model | undefined;
  existingModels: Model[] = [];
  modelTypes: Model[] = [];

  public newModelForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    typeId: ['', Validators.required],
  });

  @ViewChild('newModelTemplate', {static: false})
  public newModelTemplate: TemplateRef<any> | undefined;
  public newModelTemplateRef: MatDialogRef<any> | undefined;

  constructor(private service: ModelService,
              private dialog: MatDialog,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.currentModel = this.service.getCurrentModel();
    this.existingModels = this.service.getExistingModels();
    this.modelTypes = this.service.getModelTypes();
  }

  public openNewModelTemplate() {
    this.newModelTemplateRef = this.dialog.open(this.newModelTemplate!,{
      width: 'auto',
      height: 'auto'
    });
  }

  submitNewModel() {
    this.service.addNewModel(this.newModelForm.value);
  }
}
