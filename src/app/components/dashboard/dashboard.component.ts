import {Component, OnInit} from '@angular/core';
import {ShelfImage} from "../../models/ShelfImage";
import {ShelfImageService} from "../../services/shelf-image.service";
import {Camera} from "../../models/Camera";

@Component({
  selector: 'app-notifications',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  shelfImages: ShelfImage[] = [];
  cameras: Camera[] = [];

  constructor(private service: ShelfImageService) {
  }

  ngOnInit() {
    this.getAllShelfImages();
  }

  private getAllShelfImages(): void {

    this.service.getAllShelfImages().subscribe((shelfImages: ShelfImage[]) => {

      this.shelfImages = shelfImages;
      this.shelfImages = this.shelfImages.filter(shelfImage => shelfImage.shelfImageType?.systemId === 3);

      this.shelfImages.forEach(shelfImage => {

        if (shelfImage.referencedCamera) {
          // check if the camera is already in the list
          const cameraExists = this.cameras.some(
            camera => camera.systemId === shelfImage.referencedCamera?.systemId);
          if (!cameraExists) {
            this.cameras.push(shelfImage.referencedCamera);
          }
        }

      });

      // sort cameras by systemId accending
      this.cameras = this.cameras.sort((a, b) => a.systemId! - b.systemId!);

    });

  }

  getShelfImagesForCamera(camera: Camera): ShelfImage[] {
    return this.shelfImages.filter(
      shelfImage => shelfImage.referencedCamera?.systemId === camera.systemId);
  }

}
