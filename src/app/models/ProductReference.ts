import {Camera} from "./Camera";
import {Product} from "./Product";

export interface ProductReference {

  systemId: number;

  camera: Camera;
  product: Product;

  xCenter: number;
  yCenter: number;
  width: number;
  height: number;

}
