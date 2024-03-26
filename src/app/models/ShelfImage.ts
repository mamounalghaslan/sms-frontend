import {Camera} from "./Camera";

export interface ShelfImage {

  systemId: number;
  captureDate: Date;
  camera: Camera;
  imagePath: string;
  imageFileBase64: string;

}
