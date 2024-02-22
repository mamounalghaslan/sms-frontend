import { Injectable } from '@angular/core';
import {Model} from "../models/Model";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor() { }

  public getCurrentModel(): Model {
    return {
      systemId: 4,
      name: 'Model 4',
      typeId: 4,
      typeName: 'Type 4',
      numberOfProducts: 400,
      creationDate: new Date(),
      products: []
    };
  }

  public getExistingModels(): Model[] {
    return [
      {
        systemId: 1,
        name: 'Model 1',
        typeId: 1,
        typeName: 'Type 1',
        numberOfProducts: 100,
        creationDate: new Date(),
        products: []
      },
      {
        systemId: 2,
        name: 'Model 2',
        typeId: 2,
        typeName: 'Type 2',
        numberOfProducts: 200,
        creationDate: new Date(),
        products: []
      },
      {
        systemId: 3,
        name: 'Model 3',
        typeId: 3,
        typeName: 'Type 3',
        numberOfProducts: 300,
        creationDate: new Date(),
        products: []
      },
    ];
  }

  public getModelTypes(): Model[] {
    return this.getExistingModels();
  }

  public addNewModel(model: Model): void {
    console.log('Model added', model);
  }


}
