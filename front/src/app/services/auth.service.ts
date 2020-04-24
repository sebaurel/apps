import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { environment } from "../../environments/environment";
import { Utilisateur } from '../model/utilisateur.model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, public router: Router) { }

  public logIn(password: string, email: string){

    return this.http.post<HttpResponse<any>>(environment.API_URL+'login', { "password":password, "email":email }, { observe: 'response'})
    .pipe(map( reponse  => {
      if (reponse) {
        // store Token in local storage to keep user logged in between page refreshes
        localStorage.setItem('Token', reponse.headers.get("Authorization"));

        this.http.get(environment.API_URL+'rest/utilisateur/'+email)
          .subscribe(utilisateur => {
            localStorage.setItem('currentUser', JSON.stringify(utilisateur));
            //this.router.navigate(['/home']);
          });
      }
    }));
  }

  logOut() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('Token');
    this.router.navigate(['/login']);

  }

  ChangePassword(email: string, passwordOld: string, passwordNew: string) {
    
    let params = new HttpParams()
    .append("email", email)
    .append("passwordOld", passwordOld)
    .append("passwordNew", passwordNew);

    return this.http.post<HttpResponse<Utilisateur>>(environment.API_URL+'rest/changepassword', '',{params})

  }


}

