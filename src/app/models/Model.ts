import {ModelType} from "./ModelType";

export interface Model {

  systemId: number;
  modelType: ModelType;
  creationDate: Date;
  isRunning: boolean;

}
