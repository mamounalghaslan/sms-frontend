import {Component, OnInit} from '@angular/core';
import {ShelfImageService} from "../../../services/shelf-image.service";
import {ShelfImage} from "../../../models/ShelfImage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notifications',
  templateUrl: './shelf-images-listing.component.html'
})
export class ShelfImagesListingComponent implements OnInit {

  displayedColumns: string[] = ['systemId', 'captureDate', 'referencedCameraSystemId', 'actions'];
  shelfImages: ShelfImage[] = [];

  constructor(private service: ShelfImageService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAllShelfImages();
  }

  private getAllShelfImages(): void {
    this.service.getAllShelfImages().subscribe((shelfImages: ShelfImage[]) => {
      this.shelfImages = shelfImages;
    });
  }

  openCameraConsole(cameraId: number): void {
    this.router.navigate(['cameras/console/', cameraId]);
  }

  openEditImageProducts(shelfImageId: number): void {
    this.router.navigate(['shelf-images/edit/', shelfImageId]);
  }

}
