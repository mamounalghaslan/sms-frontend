import {ProductReference} from "./ProductReference";

export interface ProductReferenceParameters {

  inserts: ProductReference[];
  updates: ProductReference[];
  deletes: ProductReference[];

}
