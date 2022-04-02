import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:  HttpClient) { }

  sendEmail(params) {
    return this.http.post(environment.API_URL+'rest/utilisateur/email',{params},{params});
  }

}
