import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Utilisateur } from "../model/utilisateur.model";


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http : HttpClient) { }

  createAccount(utilisateur: Utilisateur ){
    return this.http.post(environment.API_URL+'rest/register', utilisateur);
      //.pipe(map(resp=>{ }));
  }

  confirmAccount(tokenConfirmation:String){
    return this.http.post(environment.API_URL+'rest/regitrationConfirm', tokenConfirmation);
  }
}
