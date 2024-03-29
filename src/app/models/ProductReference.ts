import {Product} from "./Product";
import {ShelfImage} from "./ShelfImage";

export interface ProductReference {

  systemId: number;
  shelfImage: ShelfImage;
  product: Product;
  imagePath: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;

}
