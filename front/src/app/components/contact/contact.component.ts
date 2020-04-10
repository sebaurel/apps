import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidator } from 'src/app/util/form.util';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  formContact: FormGroup;

  validationMessage = {
    'name' : {
      'required': 'Le nom est obligatoire',
      'minlength': 'Le nom doit comporter plus de 2 caractères',
      'maxlength': 'Le nom doit comporter moins de 40 caractères'
    },
    'email':{
      'required': 'L\'email est obligatoire',
      'pattern': 'L\'email n\'est pas valide'
    },
    'text':{
      'required': 'Dite moi quelque chose, un petit message ;-)'
    }
  };

  
  formErrors = {
    'name': '',
    'email': '',
    'text': '',
  };

  constructor(
    private emailService : EmailService,
    private formBuilder: FormBuilder,
    ) {
      
    }

  ngOnInit(): void {
    this.formContact = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      text: ['', Validators.required],
    })

  }

  envoie(): void {

    FormValidator(this.formContact, this.formErrors, this.validationMessage);
    console.log(this.formContact.valid);
    if (this.formContact.valid) {

      this.emailService.sendEmail({
        "name": this.formContact.get('name').value,
        "email": this.formContact.get('email').value,
        "text": this.formContact.get('text').value
      })
      .subscribe(
        () => {
          alert('Votre message a bien été envoyé');
          this.formContact.setValue({
            name: '',
            email: '',
            text: '',
          })
        }, (err: any) => {
          //alert(err.error);
          alert(err);
      })
  }
}

}
