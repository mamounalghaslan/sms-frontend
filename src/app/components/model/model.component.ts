import {Component, OnInit} from '@angular/core';
import {ModelService} from "../../services/model.service";
import {Model} from "../../models/Model";

@Component({
  selector: 'app-model-management',
  templateUrl: './model.component.html'
})
export class ModelComponent implements OnInit {

  displayedColumns: string[] = ['name', 'type', 'creationDate', 'numberOfProducts', 'actions'];

  currentModel: Model | undefined;
  existingModels: Model[] = [];

  constructor(private service: ModelService) {
  }

  ngOnInit() {
    this.currentModel = this.service.getModel();
    this.existingModels = this.service.getExistingModels();
  }

}
