import {ProductImage} from "./ProductImage";

export interface Product {

  systemId: number;
  name: string;
  location: string;
  productImages: ProductImage[];

}
