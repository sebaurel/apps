import { Injectable } from '@angular/core';
import { HttpParams, HttpEvent, HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo.model';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  
  url: string = environment.API_URL+'rest/photo';

  constructor(
    private uploadService: UploadFileService,
    private http: HttpClient
  ) { }

  uploadPhoto(selectedPhoto: File, height: number, width: number): Observable<HttpEvent<{}>>{
    
    let httpParams = new HttpParams()
    .append("height", height)
    .append("width", width);

    
    return this.uploadService.pushFileToStorage(selectedPhoto, this.url, httpParams);
  }

  deletePhoto(photo: Photo) {
    return this.http.delete(this.url+ photo.id)
  }

  public getLastPhoto(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.url+'/last', {observe: 'body'});
  }
}
