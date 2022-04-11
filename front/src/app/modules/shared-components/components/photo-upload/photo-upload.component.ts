import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Photo } from '../../models/photo.model';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  defaultPhoto: boolean = true;

  @Input() photo: Photo;
  @Input() progress: { percentage: number } = { percentage: 0 };
  @Input() photoThumbPath: String;
  @Input() width: number;
  @Input() height: number;
  @Output() photoUpload: EventEmitter<Photo> = new EventEmitter<Photo>();

  constructor(
   private photoService: PhotoService,
  ) { 
  }

  ngOnInit() {
  }

  changes(){
    if (this.photo && this.photo.id) this.defaultPhoto = false;
    else {
      this.defaultPhoto = true;
      this.photoThumbPath = environment.PATH_UPLOAD + "default-thumb.png";
    }
  }

  selectPhoto(event) {
    this.selectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progress.percentage = 0;
 
    this.currentFileUpload = this.selectedFiles.item(0)
    this.photoService.uploadPhoto(this.currentFileUpload, this.height, this.width).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.photo = JSON.parse(JSON.stringify(event.body));
        this.photoThumbPath = environment.PATH_UPLOAD+this.photo.id+"-thumb.png"; 
        this.photoUpload.emit(this.photo);
      }
    })
    this.selectedFiles = undefined;

  }

  deletePhoto() {
    this.photoThumbPath = environment.PATH_UPLOAD + "default-thumb.png";
    this.progress.percentage = 0;
    this.photoUpload.emit(null);
    this.defaultPhoto = true;
  }
}
