import {Component, OnInit} from '@angular/core';
import {ShelfImageService} from "../../../services/shelf-image.service";
import {ShelfImage} from "../../../models/ShelfImage";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-notifications',
  templateUrl: './shelf-image-editing.component.html'
})
export class ShelfImageEditingComponent implements OnInit {

  displayedColumns: string[] = ['systemId', 'captureDate', 'referencedCameraSystemId', 'actions'];

  shelfImage: ShelfImage | undefined;

  public productReferenceParametersForm = this.fb.group({
    productReferenceParameters: [undefined, Validators.required]
  });

  constructor(private fb: FormBuilder,
              private service: ShelfImageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.service.getShelfImage(this.route.snapshot.params['shelfImageId']).subscribe(
      (shelfImage: ShelfImage) => {
        this.shelfImage = shelfImage;
      });
  }

  openCameraConsole() {
    this.router.navigate(['cameras/console/', this.shelfImage?.referencedCamera?.systemId]);
  }

  productReferenceParametersChanged(parameters: any) {
    this.productReferenceParametersForm.patchValue({
      productReferenceParameters: parameters
    });
  }

  save() {
    this.service.updateShelfImage(
      this.shelfImage?.systemId!, this.productReferenceParametersForm.value['productReferenceParameters']!)
      .subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000)
    });
  }

}
