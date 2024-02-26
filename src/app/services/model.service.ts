import { Injectable } from '@angular/core';
import {Model} from "../models/Model";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor() { }

  public getCurrentModel(): Model {
    return {
      creationDate: new Date(), modelType: {
        systemId: 123,
        name: 'hello',
        pretrainedModelPath: 'hello'
      }, products: [], systemId: 0
    };
  }

  public getExistingModels(): Model[] {
    return [];
  }

  public getModelTypes(): Model[] {
    return this.getExistingModels();
  }

  public addNewModel(model: Model): void {
    console.log('Model added', model);
  }


}
