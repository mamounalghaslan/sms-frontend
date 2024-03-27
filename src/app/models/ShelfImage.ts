import {Camera} from "./Camera";

export interface ShelfImage {

  systemId: number | null;
  captureDate: Date | null;
  referencedCamera: Camera | undefined;
  imagePath: string | null;
  imageFileBase64: string | null;

}
