import {Component, OnInit} from '@angular/core';
import {ShelfImageService} from "../../../services/shelf-image.service";
import {ShelfImage} from "../../../models/ShelfImage";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-notifications',
  templateUrl: './shelf-image-editing.component.html'
})
export class ShelfImageEditingComponent implements OnInit {

  displayedColumns: string[] = ['systemId', 'captureDate', 'referencedCameraSystemId', 'actions'];
  shelfImage: ShelfImage | undefined;

  constructor(private service: ShelfImageService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.service.getShelfImage(this.route.snapshot.params['shelfImageId']).subscribe(
      (shelfImage: ShelfImage) => {
        this.shelfImage = shelfImage;
      });
  }

  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
  }

}
