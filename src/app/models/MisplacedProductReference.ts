import {ShelfImage} from "./ShelfImage";
import {Product} from "./Product";

export interface MisplacedProductReference {

  systemId: number;
  shelfImage: ShelfImage | undefined;
  misplacedProduct: Product | undefined;
  detectedProduct: Product | undefined;
  x1: number;
  y1: number;
  x2: number;
  y2: number;

}
