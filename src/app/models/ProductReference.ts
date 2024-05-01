import {Product} from "./Product";
import {ShelfImage} from "./ShelfImage";

export interface ProductReference {

  systemId: number;
  shelfImage: ShelfImage | undefined;
  product: Product | undefined;
  imageFileName: string | undefined;
  x1: number;
  y1: number;
  x2: number;
  y2: number;

}
