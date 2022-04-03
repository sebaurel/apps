import { Injectable } from '@angular/core';
import { UploadFileService } from '../services/upload-file.service';



@Injectable()
export class PhotoUtil {

    constructor( 
        private uploadService: UploadFileService
    ) {}

  uploadPhoto() {
      
  }



 /* uploadPhoto() {
    this.progress.percentage = 0;
 
    this.currentFileUpload = this.selectedFiles.item(0)
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.photo = JSON.parse(JSON.stringify(event.body));
        this.photoThumbPath = environment.PATH_UPLOAD + "" + this.photo.nomThumb; 
      }
    })
 
    this.selectedFiles = undefined
  }*/
}