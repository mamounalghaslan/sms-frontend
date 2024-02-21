import {Product} from "./Product";

export interface Model {

  name: string;
  type: string;
  numberOfProducts: number;
  creationDate: Date;

  products: Product[];

}
