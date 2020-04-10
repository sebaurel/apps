import { Injectable } from '@angular/core';
import { HttpParams, HttpEvent, HttpClient} from '@angular/common/http';
import { UploadFileService } from './upload-file.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Photo } from '../model/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  
  constructor(
    private uploadService: UploadFileService,
    private http: HttpClient
  ) { }

  uploadPhoto(selectedPhoto: File, height: string, width: string): Observable<HttpEvent<{}>>{
    
    let httpParams = new HttpParams()
    .append("height", height)
    .append("width", width);

    let url = environment.API_URL+'rest/photo'
    
    return this.uploadService.pushFileToStorage(selectedPhoto, url, httpParams);
  }

  deletePhoto(photo: Photo) {
    return this.http.delete(environment.API_URL+'rest/photo/'+ photo.id)
  }
}
