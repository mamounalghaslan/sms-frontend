import {Camera} from "./Camera";
import {ProductReference} from "./ProductReference";

export interface CameraReferenceImage {

  systemId: number;
  camera: Camera;
  imagePath: string;
  creationTime: Date;
  productReferences: ProductReference[];

}
