import {Product} from "./Product";
import {ShelfImage} from "./ShelfImage";

export interface ProductReference {

  systemId: number;
  shelfImage: ShelfImage;
  product: Product;
  imagePath: string;
  xCenter: number;
  yCenter: number;
  width: number;
  height: number;

}
