import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { Photo } from '../model/photo.model';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
 
  constructor(private http: HttpClient) { }
 
  pushFileToStorage(file: File, url: string, httpParams: HttpParams): Observable<HttpEvent<{}>> {
    

    const formdata: FormData = new FormData();
    
    formdata.append('file', file);
 
    const req = new HttpRequest('POST', url, formdata, {
      reportProgress: true,
      responseType: 'json',
      params: httpParams
    });
 
    return this.http.request(req);
  }

}