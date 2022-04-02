import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";

import { AccountService, EmailMustMatch } from "../../services/account.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidator } from 'src/app/util/form.util';
import { Utilisateur } from '../../models/utilisateur.model';
declare var grecaptcha: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  utilisateur: Utilisateur = new Utilisateur();
  captchaError: boolean = false;
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
      'required': 'Le mot de passe de vérification est obligatoire',
      'mustMatch': 'Les mots de passe ne sont pas identiques'
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
      validator: EmailMustMatch('password', 'passwordConfirm')
    });

    this.formRegister.valueChanges.subscribe(()=> {
      FormValidator(this.formRegister, this.formErrors, this.validationMessage);
    })
   }

  ngOnInit() {
    grecaptcha.ready(function() {
      grecaptcha.render("recaptcha-container", {
        "sitekey": "6Lf4wegUAAAAABUsbBkqsQl6i3ASXjgef8CI3Gfk"
      });
    });
  }

  
  onRegister(formRegister){
    this.utilisateur.pseudo = formRegister.get('pseudo').value;
    this.utilisateur.email = formRegister.get('email').value;
    this.utilisateur.password = formRegister.get('password').value;

    if (grecaptcha.getResponse().length === 0) {
      this.captchaError = true;
      alert("Serais-tu un robot ?");
      return;
    } else {
      this.utilisateur.reCaptcha = grecaptcha.getResponse();
    }

    this.accountService.createAccount(this.utilisateur).subscribe(data => {
      alert("Votre compte a bien été créé.\nVous allez recevoir un mail avec un lien pour l'activer.");
      this.router.navigate(['/home']);
    }, (err: any) => {
        alert(err);
    }
  )
  }
}