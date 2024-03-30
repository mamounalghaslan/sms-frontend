import {Camera} from "./Camera";

export interface ShelfImage {

  systemId: number | null;
  captureDate: Date | null;
  referencedCamera: Camera | undefined;
  imageFileName: string | null;

}
