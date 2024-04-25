import {Camera} from "./Camera";
import {ShelfImageType} from "./ShelfImageType";

export interface ShelfImage {

  systemId: number | null;
  shelfImageType: ShelfImageType | undefined;
  captureDate: Date | null;
  referencedCamera: Camera | undefined;
  imageFileName: string | null;

}
