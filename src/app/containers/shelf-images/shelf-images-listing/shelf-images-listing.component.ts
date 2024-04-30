import {Component, OnInit} from '@angular/core';
import {ShelfImageService} from "../../../services/shelf-image.service";
import {ShelfImage} from "../../../models/ShelfImage";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../../shared/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-notifications',
  templateUrl: './shelf-images-listing.component.html'
})
export class ShelfImagesListingComponent implements OnInit {

  displayedColumns: string[] = ['systemId', 'captureDate', 'referencedCameraSystemId', 'actions'];
  shelfImages: ShelfImage[] = [];

  constructor(private service: ShelfImageService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllShelfImages();
  }

  private getAllShelfImages(): void {
    this.service.getAllShelfImages().subscribe((shelfImages: ShelfImage[]) => {
      this.shelfImages = shelfImages;
      // remove shelfImages with status type 3
      this.shelfImages = this.shelfImages.filter(shelfImage => shelfImage.shelfImageType?.systemId !== 3);
    });
  }

  openCameraConsole(cameraId: number): void {
    this.router.navigate(['cameras/console/', cameraId]);
  }

  openEditImageProducts(shelfImageId: number): void {
    this.router.navigate(['shelf-images/edit/', shelfImageId]);
  }

  deleteShelfImage(shelfImageId: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {message: 'Are you sure you want to delete shelf image ' + shelfImageId + '?'}
    }).afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.service.deleteShelfImage(shelfImageId).subscribe(() => {
            this.getAllShelfImages();
          });
        }
    });
  }

}
