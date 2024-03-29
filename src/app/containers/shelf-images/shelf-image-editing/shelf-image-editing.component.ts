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

}
