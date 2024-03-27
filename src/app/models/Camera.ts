import {CameraStatusType} from "./CameraStatusType";

export interface Camera {

  systemId: number | null;
  cameraStatusType: CameraStatusType | undefined;
  ipAddress: string;
  location: string;
  username: string;
  password: string;

}
