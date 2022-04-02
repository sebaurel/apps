import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utilisateur } from '../../models/utilisateur.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  utilisateur: Utilisateur = new Utilisateur();
  formLogin: FormGroup;

  validationMessage = {
    'password' : {
      'required': 'Le mot de passe est obligatoire'
    },
    'email':{
      'required': 'L\'mail est obligatoir'
    }
  };

  formErrors = {
    'password': '',
    'email': ''
  };


  constructor( 
    private authService :AuthService, 
    private router: Router,
    private formBuilder: FormBuilder
    ) { 
      this.formLogin = this.formBuilder.group({
        password:['', Validators.required],
        email: ['', Validators.required]
      });

      this.formLogin.valueChanges.subscribe(()=> {
        this.formValidator(this.formLogin);
      })
    }

  ngOnInit() {

  }

  logIn(){
    this.authService.logIn(this.formLogin.get('password').value, this.formLogin.get('email').value)
      .subscribe(reponse=> {
          this.router.navigate(['/home']);
        },err=>{
          alert('Email ou mot de passe invalide !\n(Avez-vous activé votre compte ?)');
          //alert(err);
        }
      )
  }

  formValidator(group: FormGroup): void{
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.get(key);
      this.formErrors[key] = '';
      if (control && !control.valid){
        const message = this.validationMessage[key];
        for (const errorKey in control.errors){
          if (errorKey){
            this.formErrors[key] += message[errorKey] + ' ';
          }
        }
      }
    })
  }

}
