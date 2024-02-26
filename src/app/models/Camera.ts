import {CameraStatusType} from "./CameraStatusType";
import {CameraReferenceImage} from "./CameraReferenceImage";

export interface Camera {

  systemId: number;
  ipAddress: string;
  location: string;
  username: string;
  password: string;
  cameraStatusType: CameraStatusType;
  cameraReferenceImage: CameraReferenceImage;

}
