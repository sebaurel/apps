import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";

import { Utilisateur } from "../../model/utilisateur.model";
import { AccountService } from "../../services/account.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidator } from '../../util/form.util'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  utilisateur: Utilisateur = new Utilisateur();

  formRegister: FormGroup;

  validationMessage = {
    'pseudo' : {
      'required': 'Le pseudo est obligatoire'
    },
    'password' : {
      'required': 'Le mot de passe est obligatoire'
    },
    'email':{
      'required': 'L\'email est obligatoir',
      'email': 'L\'email doit être valide'
    },
    'passwordConfirm':{
      'required': 'Le mot de passe est obligatoire',
      'mustMatch': 'Les mots de passe ne sont pas identique'
    } 
  };

  formErrors = {
    'pseudo': '',
    'password': '',
    'email': '',
    'passwordConfirm': ''
  };

  erreur: any;
  messageError: string = '';

  constructor(
    private router: Router,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
  ) {
    this.formRegister = this.formBuilder.group({
      pseudo:['', Validators.required],
      password:['', Validators.required],
      passwordConfirm:['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    }, {
      validator: MustMatch('password', 'passwordConfirm')
    });

    this.formRegister.valueChanges.subscribe(()=> {
      FormValidator(this.formRegister, this.formErrors, this.validationMessage);
    })
   }

  ngOnInit() {
  }

  onRegister(formRegister){
    this.utilisateur.pseudo = formRegister.get('pseudo').value;
    this.utilisateur.email = formRegister.get('email').value;
    this.utilisateur.password = formRegister.get('password').value;
    this.accountService.createAccount(this.utilisateur).subscribe(data => {
      this.router.navigate(['/login']);
    }, (err: any) => {
        //alert(err.error);
        alert(err);
    }
  )
  }
}


export function MustMatch(controlName: string, matchingControlName: string) {
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