import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Utilisateur } from "../model/utilisateur.model";
import { FormGroup } from '@angular/forms';


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

export function EmailMustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
