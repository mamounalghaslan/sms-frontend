import {Product} from "./Product";

export interface ProductImage {

  systemId: number;
  product: Product;

  imagePath: string;
  imageFileBase64: string;

}
