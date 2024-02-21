import { Injectable } from '@angular/core';
import {Model} from "../models/Model";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor() { }

  public getModel(): Model {
    return {
      name: 'Model 4',
      type: 'Type 4',
      numberOfProducts: 400,
      creationDate: new Date(),
      products: []
    };
  }

  public getExistingModels(): Model[] {
    return [
      {
        name: 'Model 1',
        type: 'Type 1',
        numberOfProducts: 100,
        creationDate: new Date(),
        products: []
      },
      {
        name: 'Model 2',
        type: 'Type 2',
        numberOfProducts: 200,
        creationDate: new Date(),
        products: []
      },
      {
        name: 'Model 3',
        type: 'Type 3',
        numberOfProducts: 300,
        creationDate: new Date(),
        products: []
      },
    ];
  }

}
