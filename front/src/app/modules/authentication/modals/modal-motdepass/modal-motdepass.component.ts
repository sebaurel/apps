import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utilisateur } from '../../models/utilisateur.model';
import { EmailMustMatch } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-modal-motdepass',
  templateUrl: './modal-motdepass.component.html',
  styleUrls: ['./modal-motdepass.component.scss']
})
export class ModalMotdepassComponent implements OnInit {

  @Input() utilisateur: Utilisateur;



  formMotdepass: FormGroup = this.formBuilder.group({
    passwordOld:[''],
    password:['', Validators.required],
    passwordConfirm:['', Validators.required],
}, {
  validator: EmailMustMatch('password', 'passwordConfirm')
});

  validationMessage = {
    'password' : {
      'required': 'Le mot de passe est obligatoire'
    },
    'passwordConfirm':{
      'required': 'Le mot de passe de vérification est obligatoire',
      'mustMatch': 'Les mots de passe ne sont pas identiques'
    } 
  };

  formErrors = {
    'password': '',
    'passwordConfirm': ''
  };
  passwordOld: string;
  password: string;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content).result.then();
  }

  onSubmit(formMotdepass) {
    this.passwordOld = formMotdepass.get('passwordOld').value;
    this.password = formMotdepass.get('password').value;
    this.authService.ChangePassword(this.utilisateur.email, this.passwordOld, this.password)
    .subscribe(data =>{ 
      alert("Votre mot de passe a bien été changé.\nVous allez recevoir un mail de confirmation.");
      console.log(JSON.stringify(data));
    }, (err: any) => {
      alert(err);
    });
  }
}
