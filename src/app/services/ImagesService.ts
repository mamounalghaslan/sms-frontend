
export class ImagesService {

  private imagesUrl = 'http://localhost:8080/api/images';

  constructor() {}

  getImageLink(imagePath: string, objectSystemId: number, fileName: string): string {
    return this.imagesUrl + '/' + imagePath + '/' + objectSystemId + '/' + fileName;
  }

}
