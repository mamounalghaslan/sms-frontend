import {Product} from "./Product";

export interface Model {

  systemId: number;

  name: string;
  typeId: number;
  typeName: string;
  numberOfProducts: number;
  creationDate: Date;

  products: Product[];

}
